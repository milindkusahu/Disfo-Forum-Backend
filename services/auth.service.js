const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

class AuthService {
  signup = async (user) => {
    return await UserServiceInstance.register(user);
  };
}

module.exports = AuthService;
