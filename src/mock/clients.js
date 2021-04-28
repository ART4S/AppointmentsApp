import faker from "faker";

const clients = [];

function getAll() {
  if (!clients.length) {
    for (let i = 0; i < 100; i++) {
      clients.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
      });
    }
  }

  return clients;
}

export default { getAll };
