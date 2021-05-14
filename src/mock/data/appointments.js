/* eslint-disable no-nested-ternary */
import faker from "faker";

import { repeat, normalize } from "utils/collectionUtils";

import appointmentStatuses from "./enums/appointmentStatuses";
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
  const status = faker.random.arrayElement(Object.values(appointmentStatuses));
  const client = faker.random.arrayElement(Object.values(clients));
  const holder = faker.random.arrayElement(Object.values(users));

  return {
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    status,
    clientId: client.id,
    holderId: holder.id,
    complaints: faker.random.arrayElement(compliences),
    diagnosis: faker.random.arrayElement(diagnosis),
  };
}

const appointments = normalize(repeat(100, createAppointment));

export default appointments;
