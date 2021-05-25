import ServerError from "common/errors/ServerError";
import employees from "../data/employees";

class EmployeesController {
  getAll() {
    return Object.values(employees);
  }

  getById(id) {
    if (!employees[id]) {
      throw new ServerError("item not found");
    }

    return employees[id];
  }
}

export default new EmployeesController();
