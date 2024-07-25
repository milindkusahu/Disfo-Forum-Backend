const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    AuthServiceInstance.signup(req.body);
    res.json({});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { postSignup };
