/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React from "react";
import { authService, userService } from "services";
import tokenExpiredEvent from "common/events/tokenExpiredEvent";
import createReducer from "utils/createReducer";

const AuthContext = React.createContext();

const initialValue = {
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

const reducer = createReducer({
  logout(state, action) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    state.user = null;
    state.error = null;
  },

  loginSucceed(state, action) {
    const { user, token } = action.payload;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    state.user = user;
  },

  loginFailed(state, action) {
    state.error = action.payload;
  },
});

export function withAuth(Component) {
  return function WithAuth(props) {
    const [{ user, error }, dispatch] = React.useReducer(reducer, initialValue);

    React.useEffect(
      () => tokenExpiredEvent.subscribe(() => dispatch({ type: "logout" })),
      [],
    );

    async function login(email, password) {
      dispatch({ type: "logout" });

      const {
        isSuccess,
        data: { userId, token, error },
      } = await authService.login(email, password);

      if (isSuccess) {
        const user = await userService.getById(userId);
        dispatch({ type: "loginSucceed", payload: { user, token } });
      } else {
        dispatch({ type: "loginFailed", payload: error });
      }
    }

    function logout() {
      dispatch({ type: "logout" });
    }

    return (
      <AuthContext.Provider
        value={{
          user,
          error,
          login,
          logout,
        }}
      >
        <Component {...props} />
      </AuthContext.Provider>
    );
  };
}

export default function useAuth() {
  return React.useContext(AuthContext);
}
