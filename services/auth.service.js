const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();
const JWT = require("jsonwebtoken");

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
      return { isLoggedIn: true, token: this.generateToken(username) };
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

  generateToken = (username) => {
    const payload = {
      username,
    };
    const options = {
      expiresIn: "1h",
    };
    const secret = process.env.JWT_SECRET;
    const token = JWT.sign(payload, secret, options);
    return token;
  };
}

module.exports = AuthService;
