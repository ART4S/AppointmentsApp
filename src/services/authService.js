import client from "api/client";

class AuthService {
  async login(login, password) {
    const { data } = await client.put("/auth", { login, password });

    client.setToken(data.token);

    return data.user;
  }
}

export default new AuthService();
