import match from "autosuggest-highlight/match";
import { getFullName } from "utils/userUtils";
import clients from "../data/clients";

class ClientsController {
  getAll() {
    return Object.values(clients);
  }

  search(params) {
    if (!params.searchText) {
      return {
        currentPage: 0,
        totalItems: 0,
        data: [],
      };
    }

    let data = Object.values(clients)
      .map((x) => ({ id: x.id, name: getFullName(x) }))
      .map((x) => ({ ...x, matches: match(x.name, params.searchText) }))
      .filter((x) => x.matches.length);

    const itemsPerPage = +params.itemsPerPage;
    const totalPages =
      Math.ceil(itemsPerPage ? data.length / itemsPerPage : 0) - 1;
    const currentPage = Math.max(0, Math.min(totalPages, +params.currentPage));

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    data = data.slice(start, end);

    return { currentPage, totalPages, data };
  }
}

export default new ClientsController();
