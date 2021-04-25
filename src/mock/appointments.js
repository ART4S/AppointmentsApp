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

function applyFilter(item, filter) {
  if (filter.startDate && item.date < filter.startDate) {
    return false;
  }

  if (filter.finishDate && item.date > filter.finishDate) {
    return false;
  }

  const reg = new RegExp(filter.clientName);

  if (!item.clientName.match(reg)) {
    return false;
  }

  if (filter.onlyMe === "true" && item.holderName !== "Иванов Иван Иванович") {
    return false;
  }

  return true;
}

function get(filter) {
  return appointments.filter((item) => applyFilter(item, filter));
}

export default { get };
