import users from "mock/data/users";
import employees from "mock/data/employees";
import ServerError from "common/errors/ServerError";

class UsersController {
  getById(userId) {
    const user = users[userId];
    if (!user) {
      throw new ServerError("Not found");
    }

    const { id, avatar } = user;
    const { firstName, middleName, lastName } = employees[user.employeeId];

    return { id, firstName, middleName, lastName, avatar };
  }
}

export default new UsersController();
