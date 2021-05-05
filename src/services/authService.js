import client from "api/client";

class AuthService {
  async login(email, password) {
    const { data } = await client.put("/auth/login", { email, password });

    client.setToken(data.token);

    return data.user;
  }
}

export default new AuthService();
