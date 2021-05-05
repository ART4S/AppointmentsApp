import faker from "faker";

import { repeat } from "utils/collectionUtils";

function createClient() {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
  };
}

const clients = repeat(100, createClient);

export default clients;
