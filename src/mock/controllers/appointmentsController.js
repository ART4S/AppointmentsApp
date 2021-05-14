/* eslint-disable no-nested-ternary */
import { matchSorter } from "match-sorter";

import ServerError from "common/errors/serverError";
import ValidationError from "common/errors/validationError";

import { getFullName } from "utils/userUtils";

import appointments from "../data/appointments";
import clients from "../data/clients";
import users from "../data/users";

function createSorter(order, field) {
  const orderModifier = order === "asc" ? 1 : -1;
  return (a, b) =>
    orderModifier * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}

class AppointmentsController {
  getAll(params) {
    let data = Object.values(appointments);

    data = data.filter(
      (item) =>
        (!params.startDate || item.date >= params.startDate) &&
        (!params.finishDate || item.date <= params.finishDate) &&
        (!params.clientId || params.clientId === item.clientId) &&
        (!params.status || params.status === item.status) &&
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

    data = data.map((x) => ({
      ...x,
      clientName: getFullName(clients[x.clientId]),
      holderName: getFullName(users[x.holderId]),
    }));

    return { data, currentPage, pageSize, totalItems };
  }

  getById(id) {
    if (!appointments[id]) {
      throw new ServerError("item not found");
    }

    return {
      ...appointments[id],
      clientName: getFullName(clients[appointments[id].clientId]),
      holderName: getFullName(users[appointments[id].holderId]),
    };
  }

  update(id, dto) {
    if (!appointments[id]) {
      throw new ServerError("item not found");
    }

    // throw new ValidationError({
    //   common: ["Test common error 1", "Test common error 2"],
    //   fields: { status: ["Test status error 1", "Test status error 2"] },
    // });

    appointments[id] = { ...appointments[id], ...dto };
  }

  delete(id) {
    if (!appointments[id]) {
      throw new ServerError("item not found");
    }

    delete appointments[id];
  }
}

export default new AppointmentsController();
