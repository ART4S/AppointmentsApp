/* eslint-disable no-shadow */
import React from "react";

import authService from "services/authService";
import tokenExpiredEvent from "common/events/tokenExpiredEvent";

const AuthContext = React.createContext();

export function ProvideAuth({ children }) {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")),
  );

  async function login(email, password) {
    const response = await authService.login(email, password);

    if (response.isSuccess) {
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }

    return response;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  React.useEffect(() => tokenExpiredEvent.subscribe(logout), []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
