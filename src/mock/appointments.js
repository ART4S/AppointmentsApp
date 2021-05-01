import faker from "faker";
import { matchSorter } from "match-sorter";

import pickFrom from "utils/pickFrom";
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

function getAll(filter) {
  if (!appointments.length) {
    for (let i = 0; i < 100; i++) {
      const status = pickFrom(appointmentStatuses.getAll());
      const holder = pickFrom(users.getAll());
      const client = pickFrom(clients.getAll());

      appointments.push({
        id: faker.datatype.uuid(),
        date: faker.date.recent(),
        clientId: client.id,
        clientName: getFullName(client),
        statusId: status.id,
        status: status.name,
        holderId: holder.id,
        holderName: getFullName(holder),
        complaints: pickFrom(compliences),
        diagnosis: pickFrom(diagnosis),
      });
    }
  }

  let filteredAppointments = appointments.filter(
    (item) =>
      (!filter.startDate || item.date >= filter.startDate) &&
      (!filter.finishDate || item.date <= filter.finishDate) &&
      item.clientName.match(new RegExp(filter.clientName)) &&
      (!filter.onlyMe ||
        filter.onlyMe === "false" ||
        item.holderName === users[0]) &&
      (!filter.statusId || +filter.statusId === item.statusId) &&
      (!filter.holderId || +filter.holderId === item.holderId),
  );

  if (filter.complaints) {
    filteredAppointments = matchSorter(
      filteredAppointments,
      filter.complaints,
      { keys: [(item) => item.complaints] },
    );
  }

  return filteredAppointments.slice(filter.skip, filter.take);
}

export default { getAll };
