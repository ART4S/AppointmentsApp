import faker from "faker";

faker.locale = "ru";

const users = [];

function getAll() {
  if (!users.length) {
    for (let i = 0; i < 100; i++) {
      users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
      });
    }
  }

  return users;
}

export default { getAll };
