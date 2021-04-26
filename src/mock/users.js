import faker from "faker";

const users = [];

function getAll() {
  if (!users.length) {
    for (let i = 0; i < 100; i++) {
      users.push({
        id: i,
        firstName: faker.name.findName,
        middleName: faker.name.middleName,
        lastName: faker.name.lastName,
      });
    }
  }

  return users;
}

export default { getAll };
