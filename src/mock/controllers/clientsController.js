import match from "autosuggest-highlight/match";
import { getFullName } from "utils/userUtils";
import clients from "../data/clients";

class ClientsController {
  getAll() {
    return Object.values(clients);
  }

  search(searchText) {
    if (!searchText) {
      return [];
    }

    return Object.values(clients)
      .map((x) => ({ id: x.id, name: getFullName(x) }))
      .map((x) => ({ ...x, matches: match(x.name, searchText) }))
      .filter((x) => x.matches.length);
  }
}

export default new ClientsController();
