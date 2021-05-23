import { repeat, normalize } from "utils/collectionUtils";
import faker from "faker";

faker.locale = "ru";

function createEmployee() {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    dateOfBirth: faker.date.past(20),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  };
}

const employees = normalize(repeat(40, createEmployee));

export default employees;
