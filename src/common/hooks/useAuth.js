import React from "react";

import authService from "services/authService";

const AuthContext = React.createContext();

function useProvideAuth() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")),
  );

  async function login(email, password) {
    const newUser = await authService.login(email, password);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  return {
    user,
    login,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return React.useContext(AuthContext);
}
