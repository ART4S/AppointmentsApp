import faker from "faker";

import { repeat } from "utils/collectionUtils";

faker.locale = "ru";

export const defaultUser = {
  id: "5edf2686-1539-4412-8753-e802229e546c",
  firstName: "Иван",
  middleName: "Иванович",
  lastName: "Иванов",
  login: "admin",
  password: "admin",
};

function createUser() {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    login: faker.internet.email(),
    password: faker.internet.password(),
  };
}

const users = [defaultUser, ...repeat(100, createUser)];

export default users;
