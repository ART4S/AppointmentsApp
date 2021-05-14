import faker from "faker";

import { repeat, normalize } from "utils/collectionUtils";

faker.locale = "ru";

export const defaultUsers = [
  {
    id: "b7bd063a-836f-4f93-9128-348c2efe84f4",
    firstName: "Иван",
    middleName: "Иванович",
    lastName: "Иванов",
    login: "admin@mail.com",
    password: "admin",
  },
  {
    id: "5edf2686-1539-4412-8753-e802229e546c",
    firstName: "Петр",
    middleName: "Петрович",
    lastName: "Петров",
    login: "user@mail.com",
    password: "user",
  },
];

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

const users = normalize([...defaultUsers, ...repeat(100, createUser)]);

export default users;
