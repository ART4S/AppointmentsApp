import client from "api/client";

class AuthService {
  async login(email, password) {
    try {
      const { data } = await client.put("/auth/login", { email, password });
      return data;
    } catch (e) {
      if (e.response.status === 400) {
        return e.response.data;
      }
      throw e;
    }
  }
}

export default new AuthService();
