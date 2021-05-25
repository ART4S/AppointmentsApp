/* eslint-disable no-nested-ternary */
import ServerError from "common/errors/ServerError";
import { getFullName } from "utils/userUtils";

import events from "../data/events";
import employees from "../data/employees";

function createSorter(order, field) {
  const orderModifier = order === "asc" ? 1 : -1;
  return (a, b) =>
    orderModifier * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}

class EventsController {
  getAll(params) {
    let data = Object.values(events).map((x) => ({
      ...x,
      authorName: getFullName(employees[x.authorId]),
    }));

    if (params.field) {
      data = data.sort(createSorter(params.order, params.field));
    }

    const totalItems = data.length;
    const itemsPerPage = +params.itemsPerPage;
    const currentPage = Math.max(
      0,
      Math.min(
        Math.ceil(itemsPerPage ? totalItems / itemsPerPage : 0) - 1,
        +params.currentPage,
      ),
    );

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    data = data.slice(start, end);

    const pageSize = data.length;

    return { currentPage, pageSize, totalItems, data };
  }

  update(id, dto) {
    if (!events[id]) {
      throw new ServerError("item not found");
    }

    events[id] = { ...events[id], ...dto };
  }
}

export default new EventsController();
