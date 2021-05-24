import client from "api/client";
import { handleResponse } from "utils/responseUtils";

function login(email, password) {
  return handleResponse(() => client.put("/auth/login", { email, password }));
}

export default { login };
