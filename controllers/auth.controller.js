const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    const result = await AuthServiceInstance.signup(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const result = await AuthServiceInstance.login(req.body);
    if (result.isLoggedIn) {
      res.cookie("token", result.token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
      res.json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { postSignup, postLogin };
