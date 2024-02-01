// require("dotenv").config();
// const passport = require("passport");
// const { Strategy } = require("passport-google-oauth20");

// const config = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
// };

// const AUTH_OPTIONS = {
//   clientID: config.CLIENT_ID,
//   clientSecret: config.CLIENT_SECRET,
//   callbackURL: "http://localhost:8001/auth/google/callback",
//   passReqToCallback: true,
// };

// function verifyCallback(accessToken, refreshToken, profile, done) {
//   console.log("Google profile", profile);
//   console.log(done);
//   return done(null, profile);
// }

// passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// module.exports = passport;
