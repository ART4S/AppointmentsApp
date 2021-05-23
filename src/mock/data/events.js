import faker from "faker";
import { repeat, normalize } from "utils/collectionUtils";
import eventTypes from "./enums/eventTypes";
import employees from "./employees";

function createEvent() {
  const type = faker.random.arrayElement(Object.values(eventTypes));
  const author = faker.random.arrayElement(Object.values(employees));
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word,
    date: faker.date.future(),
    type,
    authorId: author.id,
  };
}

const events = normalize(repeat(10, createEvent));

export default events;
