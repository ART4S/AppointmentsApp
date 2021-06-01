import faker from "faker";
import { normalize } from "utils/collectionUtils";

const defaultUsers = [
  {
    id: "b7bd063a-836f-4f93-9128-348c2efe84f4",
    employeeId: "54f93d61-e0d1-4809-aa54-cd5d600f11e3",
    login: "admin@mail.com",
    password: "admin",
    avatar: faker.internet.avatar(),
  },
  {
    id: "5edf2686-1539-4412-8753-e802229e546c",
    employeeId: "a7686456-f26a-47d8-b5a2-1c57c1f1ca12",
    login: "user@mail.com",
    password: "user",
    avatar: faker.internet.avatar(),
  },
];

const users = normalize(defaultUsers);

export default users;
