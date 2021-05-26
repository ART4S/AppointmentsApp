import faker from "faker";
import { repeat, normalize } from "utils/collectionUtils";
import notificationTypes from "./enums/notificationTypes";
import employees from "./employees";

function createNotification() {
  const type = faker.random.arrayElement(Object.values(notificationTypes));
  const employee = faker.random.arrayElement(Object.values(employees));
  return {
    id: faker.datatype.uuid(),
    date: faker.date.past(),
    type,
    name: faker.lorem.word(),
    description: faker.lorem.text(),
    employeeId: employee.id,
    seen: faker.datatype.boolean(),
  };
}

const notifications = normalize(repeat(1000, createNotification));

export default notifications;
