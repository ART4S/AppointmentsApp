import client from "api/client";

class ClientService {
  async getAll() {
    const { data } = await client.get("/clients");
    return data;
  }
}

export default new ClientService();
