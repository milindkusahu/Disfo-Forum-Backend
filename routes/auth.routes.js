const router = require("express").Router();
const { postSignup } = require("../controllers/auth.controller.js");

const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware.js");

const middleware = validateSchema(userValidationSchema);

router.post("/signup", middleware, postSignup);

module.exports = router;
