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

function getAll(filter) {
  if (!appointments.length) {
    for (let i = 0; i < 100; i++) {
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

  let filteredAppointments = appointments.filter(
    (item) =>
      (!filter.startDate || item.date >= filter.startDate) &&
      (!filter.finishDate || item.date <= filter.finishDate) &&
      (!filter.clientId || filter.clientId === item.clientId) &&
      (!filter.statusId || filter.statusId === item.statusId) &&
      (!filter.holderId || filter.holderId === item.holderId) &&
      (!filter.onlyMe ||
        filter.onlyMe === "false" ||
        item.holderName === users[0]),
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
