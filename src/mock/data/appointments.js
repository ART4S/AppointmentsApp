/* eslint-disable no-nested-ternary */
import faker from "faker";

import { repeat } from "utils/collectionUtils";
import { getFullName } from "utils/userUtils";

import appointmentStatuses from "./dictionaries/appointmentStatuses";
import users from "./users";
import clients from "./clients";

const compliences = [
  "Боль в правом ухе",
  "Боль в горле",
  "Головные боли",
  "Тошнота",
  "Ротавирус",
];

const diagnosis = ["Застужено правое ухо", "Ангина", "Мигрень"];

function createAppointment() {
  const status = faker.random.arrayElement(appointmentStatuses);
  const holder = faker.random.arrayElement(users);
  const client = faker.random.arrayElement(clients);

  return {
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
  };
}

const appointments = repeat(100, createAppointment);

export default appointments;
