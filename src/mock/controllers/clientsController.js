import clients from "../data/clients";

class ClientsController {
  getAll() {
    return Object.values(clients);
  }
}

export default new ClientsController();
