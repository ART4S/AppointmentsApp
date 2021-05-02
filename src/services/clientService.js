import client from "api/client";

class ClientService {
  getAll() {
    return client.get("/clients").then((response) => response.data);
  }
}

export default new ClientService();
