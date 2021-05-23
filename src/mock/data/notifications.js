import faker from "faker";
import { repeat, normalize } from "utils/collectionUtils";
import notificationTypes from "./enums/notificationTypes";
import employees from "./employees";

function createNotification() {
  const type = faker.random.arrayElement(Object.values(notificationTypes));
  const employee = faker.random.arrayElement(Object.values(employees));
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word,
    date: faker.date.future(),
    type,
    employeeId: employee.id,
  };
}

const notifications = normalize(repeat(10, createNotification));

export default notifications;
