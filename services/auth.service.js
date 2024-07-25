const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

class AuthService {
  signup = async (user) => {
    const hashPassword = await this.hashPassword(user.password);
    const data = {
      ...user,
      password: hashPassword,
    };
    return await UserServiceInstance.register(data);
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
}

module.exports = AuthService;
