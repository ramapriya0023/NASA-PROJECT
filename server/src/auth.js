const passport = require("passport");
const express = require("express");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authRouter = express.Router();

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8001/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Use the profile information to create or update a user in your database
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Redirect the user to Google for authentication
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/launch");
  }
);

// Login route
authRouter.get("/login", (req, res) => {
  res.send("Login page");
});

// Logout route
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.send("Goodbye!");
  });
});

module.exports = authRouter;
