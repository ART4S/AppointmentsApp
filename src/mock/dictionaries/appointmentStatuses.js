import faker from "faker";

const appointmentStatuses = [
  { id: faker.datatype.uuid(), name: "Завершён" },
  { id: faker.datatype.uuid(), name: "Ожидается" },
  { id: faker.datatype.uuid(), name: "Пропущен" },
  { id: faker.datatype.uuid(), name: "Отменён" },
  { id: faker.datatype.uuid(), name: "Перенесён" },
  { id: faker.datatype.uuid(), name: "Активен" },
];

export default { getAll: () => appointmentStatuses };
