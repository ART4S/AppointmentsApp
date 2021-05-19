import client from "api/client";

class ClientService {
  async getAll() {
    const { data } = await client.get("/clients");
    return data;
  }

  async search(searchText, pagination) {
    const { data } = await client.get("/clients/search", {
      searchText,
      ...pagination,
    });
    return data;
  }
}

export default new ClientService();
