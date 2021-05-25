/* eslint-disable no-unreachable */
/* eslint-disable no-nested-ternary */
import faker from "faker";
import { matchSorter } from "match-sorter";

import ServerError from "common/errors/ServerError";
import ValidationError from "common/errors/ValidationError";

import { getFullName } from "utils/userUtils";

import appointments from "../data/appointments";
import clients from "../data/clients";
import employees from "../data/employees";
import appointmentStatuses from "../data/enums/appointmentStatuses";

function createSorter(order, field) {
  const orderModifier = order === "asc" ? 1 : -1;
  return (a, b) =>
    orderModifier * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}

class AppointmentsController {
  getAll(params) {
    let data = Object.values(appointments).map((x) => ({
      ...x,
      clientName: getFullName(clients[x.clientId]),
      holderName: getFullName(employees[x.holderId]),
    }));

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

    return { currentPage, pageSize, totalItems, data };
  }

  getById(id) {
    if (!appointments[id]) {
      throw new ServerError("item not found");
    }

    return {
      ...appointments[id],
      clientName: getFullName(clients[appointments[id].clientId]),
      holderName: getFullName(employees[appointments[id].holderId]),
    };
  }

  create(dto) {
    // throw new ValidationError({
    //   common: ["Test common error 1", "Test common error 2"],
    //   fields: { date: ["Test status error 1", "Test status error 2"] },
    // });

    const id = faker.datatype.uuid();

    appointments[id] = { ...dto, id, status: appointmentStatuses.pending };

    return id;
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
