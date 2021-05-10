/* eslint-disable no-nested-ternary */
import { matchSorter } from "match-sorter";

import ServerError from "common/errors/serverError";

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

    return { data, currentPage, pageSize, totalItems };
  }

  getById(id) {
    const appointment = appointments.find((x) => x.id === id);
    if (!appointment) {
      throw new ServerError("item not found");
    }
    return appointment;
  }

  delete(id) {
    const index = appointments.findIndex((x) => x.id === id);
    if (index > -1) {
      appointments.splice(index, 1);
    } else {
      throw new ServerError("item not found");
    }
  }
}

export default new AppointmentsController();
