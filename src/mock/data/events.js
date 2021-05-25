import faker from "faker";
import { repeat, normalize } from "utils/collectionUtils";
import eventTypes from "./enums/eventTypes";
import employees from "./employees";

function createEvent() {
  const type = faker.random.arrayElement(Object.values(eventTypes));
  const [author, employee] = faker.random.arrayElements(
    Object.values(employees),
    2,
  );
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    date: faker.date.future(),
    type,
    authorId: author.id,
    employeeId: employee.id,
    seen: faker.datatype.boolean(),
  };
}

const events = normalize(repeat(10, createEvent));

export default events;
