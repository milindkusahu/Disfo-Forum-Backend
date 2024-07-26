const router = require("express").Router();
const { postSignup } = require("../controllers/auth.controller.js");
const { postLogin } = require("../controllers/auth.controller");

const { userValidationSchema } = require("../validations/user.validator");
const {
    loginBodyValidatorSchema,
  } = require("../validations/auth.validator.js");

const { validateSchema } = require("../middlewares/validate.middleware.js");

const middleware = validateSchema(userValidationSchema);

const loginMiddleware = validateSchema(loginBodyValidatorSchema);

router.post("/signup", middleware, postSignup);
router.post("/login", loginMiddleware, postLogin);

module.exports = router;
