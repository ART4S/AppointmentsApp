import client from "api/client";

class UserService {
  getAll() {
    return client.get("/users").then((response) => response.data);
  }
}

export default new UserService();
