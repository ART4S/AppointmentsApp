/* eslint-disable no-shadow */
import React from "react";

import authService from "services/authService";
import tokenExpiredEvent from "common/events/tokenExpiredEvent";

const AuthContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "logout": {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { ...state, user: null, error: null };
    }
    case "loginSucceed": {
      const { user, token } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { ...state, user };
    }
    case "loginFailed": {
      return { ...state, error: action.payload };
    }
    default:
      throw new Error();
  }
}

export function ProvideAuth({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
  });

  function logout() {
    dispatch({ type: "logout" });
  }

  async function login(email, password) {
    dispatch({ type: "logout" });

    const {
      isSuccess,
      data: { user, token, error },
    } = await authService.login(email, password);

    if (isSuccess) {
      dispatch({ type: "loginSucceed", payload: { user, token } });
    } else {
      dispatch({ type: "loginFailed", payload: error });
    }
  }

  React.useEffect(() => tokenExpiredEvent.subscribe(logout), []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return React.useContext(AuthContext);
}
