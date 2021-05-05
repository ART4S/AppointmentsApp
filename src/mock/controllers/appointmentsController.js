/* eslint-disable no-nested-ternary */
import { matchSorter } from "match-sorter";

import appointments from "../data/appointments";

function createSorter(order, field) {
  const orderModifier = order === "asc" ? 1 : -1;
  return (a, b) =>
    orderModifier * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}

class AppointmentsController {
  getAll(params) {
    let data = appointments;

    data = data.filter(
      (item) =>
        (!params.startDate || item.date >= params.startDate) &&
        (!params.finishDate || item.date <= params.finishDate) &&
        (!params.clientId || params.clientId === item.clientId) &&
        (!params.statusId || params.statusId === item.statusId) &&
        (!params.holderId || params.holderId === item.holderId) &&
        (!params.onlyMe || params.onlyMe === "false"),
    );

    if (params.complaints) {
      data = matchSorter(data, params.complaints, {
        keys: [(item) => item.complaints],
      });
    }

    if (params.field) {
      data = data.sort(createSorter(params.order, params.field));
    }

    const totalItems = data.length;

    const start = params.currentPage * params.itemsPerPage;
    const end = start + +params.itemsPerPage;

    data = data.slice(start, end);

    const pageSize = data.length;

    return { data, pageSize, totalItems };
  }
}

export default new AppointmentsController();
