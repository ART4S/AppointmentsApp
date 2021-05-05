import users from "../data/users";

class UsersController {
  getAll() {
    return users;
  }
}

export default new UsersController();
