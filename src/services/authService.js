import client from "api/client";
import { handleResponse } from "utils/responseUtils";

class AuthService {
  login(email, password) {
    return handleResponse(() => client.put("/auth/login", { email, password }));
  }
}

export default new AuthService();
