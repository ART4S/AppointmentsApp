const appointmentStatuses = [
  { id: 0, title: "Завершён" },
  { id: 1, title: "Ожидается" },
  { id: 2, title: "Пропущен" },
  { id: 3, title: "Отменён" },
  { id: 4, title: "Перенесён" },
  { id: 5, title: "Активен" },
];

export default { get: () => appointmentStatuses };
