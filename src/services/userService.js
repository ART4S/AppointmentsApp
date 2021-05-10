import client from "api/client";

class UserService {
  async getAll() {
    const { data } = await client.get("/users");
    return data;
  }
}

export default new UserService();
