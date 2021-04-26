import faker from "faker";

import appointmentStatuses from "./dictionaries/appointmentStatuses";
import pickFrom from "utils/pickFrom";

const appointments = [];

const nameTemplate = "{{name.firstName}} {{name.middleName}} {{name.lastName}}";

const holders = [
  faker.fake(nameTemplate),
  faker.fake(nameTemplate),
  faker.fake(nameTemplate),
];

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
    const statuses = appointmentStatuses.getAll();

    for (let i = 0; i < 100; i++) {
      const status = pickFrom(statuses);

      appointments.push({
        id: i,
        date: faker.date.recent(),
        clientName: faker.fake(nameTemplate),
        statusId: status.id,
        status: status.name,
        holderName: pickFrom(holders),
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
        (!filter.onlyMe ||
          filter.onlyMe === "false" ||
          item.holderName === holders[0]) &&
        (isNaN(parseInt(filter.statusId)) || filter.statusId == item.statusId)
    )
    .slice(filter.skip, filter.take);
}

export default { getAll };
