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
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // We can use the profile information to create or update a user in the database
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
authRouter.get("/", (req, res) => {
  res.send("Login page");
});

authRouter.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      user: req.user,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Logout route
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.send("Goodbye!");
  });
});

module.exports = authRouter;
