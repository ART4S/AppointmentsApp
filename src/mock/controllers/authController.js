import jwt from "jwt-simple";
import moment from "moment";

import ServerError from "common/errors/ServerError";

import users from "../data/users";
import employees from "../data/employees";

const secret = "1dsewr3";

class AuthController {
  login(login, password) {
    const user = Object.values(users).find(
      (x) => x.login === login && x.password === password,
    );

    if (!user) {
      throw new ServerError("Неверный логин или пароль");
    }

    const { id } = user;

    const expiresAt = moment().add(30, "minutes").format("DD.MM.YYYYThh:mm:ss");

    return {
      token: jwt.encode({ id, expiresAt }, secret),
      expiresAt,
      userId: id,
    };
  }

  extractUser(request) {
    const { Authorization } = request.requestHeaders;
    if (!Authorization) {
      return null;
    }

    const [, token] = /^Bearer (\S+$)/.exec(Authorization);
    if (!token) {
      return null;
    }

    const { id } = jwt.decode(token, secret);

    return users[id];
  }
}

export default new AuthController();
