const appointments = [
  {
    id: 0,
    date: "2011-10-10T00:00:00",
    clientName: "Должанский Николай Сергеевич",
    status: "Завершён",
    holderName: "Иванов Иван Иванович",
    compliences: "Боль в правом ухе",
    diagnosis: "Застужено правое ухо",
  },
  {
    id: 1,
    date: "2012-10-10T00:00:01",
    clientName: "Петров Пётр Генадьевич",
    status: "Завершён",
    holderName: "Иванов Иван Иванович",
    compliences: "Боль в горле",
    diagnosis: "Ангина",
  },
  {
    id: 2,
    date: "2013-10-10T00:00:00",
    clientName: "Буйкевич Галина Петровна",
    status: "Завершён",
    holderName: "Нестеров Валерий Викторович",
    compliences: "Головные боли",
    diagnosis: "Мигрень",
  },
  {
    id: 3,
    date: "2014-10-10T00:00:00",
    clientName: "Астафьева Ирина Михайловна",
    status: "Завершён",
    holderName: "Сидоров Генадий Павлович",
    compliences: "Тошнота",
    diagnosis: "Ротавирус",
  },
];

function get(filter) {
  return appointments.filter(
    (item) =>
      (!filter.startDate || item.date >= filter.startDate) &&
      (!filter.finishDate || item.date <= filter.finishDate) &&
      item.clientName.match(new RegExp(filter.clientName)) &&
      (filter.onlyMe === "false" || item.holderName === "Иванов Иван Иванович")
  );
}

export default { get };
