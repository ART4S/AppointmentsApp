import users from "../data/users";
import UserInfoDto from "../dto/userInfoDto";

class AuthController {
  login(login, password) {
    const user = users.find(
      (x) => x.login === login && x.password === password,
    );

    return {
      token: "123",
      user: new UserInfoDto(
        user.id,
        user.firstName,
        user.middleName,
        user.lastName,
      ),
    };
  }
}

export default new AuthController();
