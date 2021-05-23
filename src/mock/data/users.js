import { normalize } from "utils/collectionUtils";

const defaultUsers = [
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

const users = normalize(defaultUsers);

export default users;
