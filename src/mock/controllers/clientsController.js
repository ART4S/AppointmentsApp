import clients from "../data/clients";

class ClientsController {
  getAll() {
    return clients;
  }
}

export default new ClientsController();
