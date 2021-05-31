import faker from "faker";

import { repeat, normalize } from "utils/collectionUtils";

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

function createClient() {
  const gender = faker.random.arrayElement(genders);
  const firstName = faker.random.arrayElement(dataSource[gender].firstNames);
  const middleName = faker.random.arrayElement(dataSource[gender].middleNames);
  const lastName = faker.random.arrayElement(dataSource[gender].lastNames);

  return {
    id: faker.datatype.uuid(),
    firstName,
    middleName,
    lastName,
    address: faker.address.streetAddress(true),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  };
}

const clients = normalize(repeat(1000, createClient));

export default clients;
