const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const secret = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  console.log({ payload });
  done(null, true);
});

module.exports = (passport) => {
  passport.use(strategy);
};
