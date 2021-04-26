const appointmentStatuses = [
  { id: 0, name: "Завершён" },
  { id: 1, name: "Ожидается" },
  { id: 2, name: "Пропущен" },
  { id: 3, name: "Отменён" },
  { id: 4, name: "Перенесён" },
  { id: 5, name: "Активен" },
];

export default { getAll: () => appointmentStatuses };
