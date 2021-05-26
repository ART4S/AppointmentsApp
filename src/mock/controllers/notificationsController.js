/* eslint-disable no-nested-ternary */
import ServerError from "common/errors/ServerError";
import notifications from "../data/notifications";

function createSorter(order, field) {
  const orderModifier = order === "asc" ? 1 : -1;
  return (a, b) =>
    orderModifier * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}

class NotificationsController {
  getAll(params) {
    let data = Object.values(notifications).map((x) => ({
      ...x,
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

  getNewCount() {
    return Object.values(notifications).filter((x) => !x.seen).length;
  }

  update(id, dto) {
    if (!notifications[id]) {
      throw new ServerError("item not found");
    }

    notifications[id] = { ...notifications[id], ...dto };
  }
}

export default new NotificationsController();
