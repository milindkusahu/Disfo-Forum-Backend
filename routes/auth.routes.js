const router = require("express").Router();
const { postSignup } = require("../controllers/auth.controller.js");
const { postLogin } = require("../controllers/auth.controller");

const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware.js");

const middleware = validateSchema(userValidationSchema);

router.post("/signup", middleware, postSignup);
router.post("/login", postLogin);

module.exports = router;
