import client from "api/client";

class ClientService {
  async getAll() {
    const { data } = await client.get("/clients");
    return data;
  }

  async search(searchText) {
    const { data } = await client.get("/clients/search", { searchText });
    return data;
  }
}

export default new ClientService();
