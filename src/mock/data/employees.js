import { repeat, normalize } from "utils/collectionUtils";
import faker from "faker";

faker.locale = "ru";

const genders = ["male", "female"];

const dataSource = {
  male: {
    firstNames: [
      "Авдей",
      "Авксентий",
      "Агафон",
      "Акакий",
      "Александр",
      "Алексей",
      "Альберт",
      "Альвиан",
    ],

    middleNames: [
      "Александрович",
      "Алексеевич",
      "Анатольевич",
      "Андреевич",
      "Антонович",
      "Аркадьевич",
      "Арсеньевич",
      "Артемович",
      "Афанасьевич",
    ],

    lastNames: [
      "Смирнов",
      "Иванов",
      "Кузнецов",
      "Соколов",
      "Попов",
      "Лебедев",
      "Козлов",
      "Новиков",
      "Морозов",
      "Петров",
      "Волков",
    ],
  },

  female: {
    firstNames: [
      "Александра",
      "Алина",
      "Алла",
      "Анастасия",
      "Ангелина",
      "Анжела",
      "Анжелика",
      "Анна",
      "Антонина",
      "Анфиса ",
    ],

    middleNames: [
      "Александровна",
      "Алексеевна",
      "Анатольевна",
      "Андреевна",
      "Антоновна",
      "Аркадьевна",
      "Артемовна",
      "Богдановна",
      "Борисовна",
    ],

    lastNames: [
      "Смирнова",
      "Иванова",
      "Кузнецова",
      "Соколова",
      "Попова",
      "Лебедева",
      "Козлова",
      "Новикова",
      "Морозова",
      "Петрова",
      "Волкова",
    ],
  },
};

function createEmployee() {
  const gender = faker.random.arrayElement(genders);
  const firstName = faker.random.arrayElement(dataSource[gender].firstNames);
  const middleName = faker.random.arrayElement(dataSource[gender].middleNames);
  const lastName = faker.random.arrayElement(dataSource[gender].lastNames);

  return {
    id: faker.datatype.uuid(),
    firstName,
    middleName,
    lastName,
    dateOfBirth: faker.date.past(20),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  };
}

const defaultEmployees = [
  {
    id: "54f93d61-e0d1-4809-aa54-cd5d600f11e3",
    firstName: "Иван",
    middleName: "Иванович",
    lastName: "Иванов",
  },
  {
    id: "a7686456-f26a-47d8-b5a2-1c57c1f1ca12",
    firstName: "Петр",
    middleName: "Петрович",
    lastName: "Петров",
  },
];

const employees = normalize([
  ...defaultEmployees,
  ...repeat(40, createEmployee),
]);

export default employees;
