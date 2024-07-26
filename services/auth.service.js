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

  login = async ({ username, password }) => {
    const isPasswordSame = await this.verifyPassword(username, password);
    if (isPasswordSame) {
      return { isLoggedIn: true };
    } else {
      return {};
    }
  };

  verifyPassword = async (username, password) => {
    const user = await UserServiceInstance.findByUsername(username);
    if (!user) return false;
    const storedPassword = user.password;
    const isPasswordSame = await bcrypt.compare(password, storedPassword);
    if (isPasswordSame) return true;
    return false;
  };
}

module.exports = AuthService;
