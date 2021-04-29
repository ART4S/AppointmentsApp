import faker from "faker";

import pickFrom from "utils/pickFrom";
import getFullName from "utils/getFullName";
import appointmentStatuses from "./dictionaries/appointmentStatuses";
import users from "./users";
import clients from "./clients";

const appointments = [];

const compliences = ["Боль в правом ухе", "Боль в горле", "Головные боли", "Тошнота", "Ротавирус"];

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
        compliences: pickFrom(compliences),
        diagnosis: pickFrom(diagnosis),
      });
    }
  }

  return appointments
    .filter(
      (item) =>
        (!filter.startDate || item.date >= filter.startDate) &&
        (!filter.finishDate || item.date <= filter.finishDate) &&
        item.clientName.match(new RegExp(filter.clientName)) &&
        (!filter.onlyMe || filter.onlyMe === "false" || item.holderName === users[0]) &&
        (!filter.statusId || filter.statusId === item.statusId) &&
        (!filter.holderId || filter.holderId === item.holderId) &&
        item.compliences.match(new RegExp(filter.compliences)),
    )
    .slice(filter.skip, filter.take);
}

export default { getAll };
