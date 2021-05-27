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
    seen: true,
  };
}

const events = normalize(repeat(10, createEvent));

Object.values(events)
  .slice(0, 5)
  .forEach((x) => {
    // eslint-disable-next-line no-param-reassign
    x.seen = false;
  });

export default events;
