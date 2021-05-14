import users from "../data/users";

class UsersController {
  getAll() {
    return Object.values(users);
  }
}

export default new UsersController();
