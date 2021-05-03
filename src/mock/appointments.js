/* eslint-disable no-nested-ternary */
import faker from "faker";
import { matchSorter } from "match-sorter";

import getFullName from "utils/getFullName";
import appointmentStatuses from "./dictionaries/appointmentStatuses";
import users from "./users";
import clients from "./clients";

const appointments = [];

const compliences = [
  "Боль в правом ухе",
  "Боль в горле",
  "Головные боли",
  "Тошнота",
  "Ротавирус",
];

const diagnosis = ["Застужено правое ухо", "Ангина", "Мигрень"];

function createSorter(order, field) {
  const orderModifier = order === "asc" ? 1 : -1;
  return (a, b) =>
    orderModifier * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
}

function getAll(params) {
  if (!appointments.length) {
    for (let i = 0; i < 101; i++) {
      const status = faker.random.arrayElement(appointmentStatuses.getAll());
      const holder = faker.random.arrayElement(users.getAll());
      const client = faker.random.arrayElement(clients.getAll());

      appointments.push({
        id: faker.datatype.uuid(),
        date: faker.date.recent(),
        clientId: client.id,
        clientName: getFullName(client),
        statusId: status.id,
        status: status.name,
        holderId: holder.id,
        holderName: getFullName(holder),
        complaints: faker.random.arrayElement(compliences),
        diagnosis: faker.random.arrayElement(diagnosis),
      });
    }
  }

  let data = appointments.slice();

  data = data.filter(
    (item) =>
      (!params.startDate || item.date >= params.startDate) &&
      (!params.finishDate || item.date <= params.finishDate) &&
      (!params.clientId || params.clientId === item.clientId) &&
      (!params.statusId || params.statusId === item.statusId) &&
      (!params.holderId || params.holderId === item.holderId) &&
      (!params.onlyMe ||
        params.onlyMe === "false" ||
        item.holderName === users[0]),
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

export default { getAll };
