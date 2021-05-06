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

    if (!response.error) {
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
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
