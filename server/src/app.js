const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const Strategy = require("passport-google-oauth2").Strategy;

const api = require("./routes/api");

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "http://localhost:8001/auth/google/callback",
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Inside verifyCallback");
  console.log("profile:", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app = express();

function checkLoggedIn(req, res, next) {
  console.log(req);
  req.user ? next() : res.sendStatus(401);
}

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(morgan("short"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

app.get("/home", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/home",
//     failureRedirect: "/auth/google/failure",
//   })
// );
app.get("/auth/google/callback", checkLoggedIn, (req, res) => {
  console.log(req);
  res.send(`Hello ${req.user.displayName}`);
});
// app.get("/protected", checkLoggedIn, (req, res) => {
//   res.send(`Hello ${req.user.displayName}`);
// });

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

// app.get("/*", checkLoggedIn, (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

module.exports = app;
