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

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(morgan("short"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

// app.get("/*", checkLoggedIn, (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

module.exports = app;
