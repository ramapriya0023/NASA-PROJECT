const express = require("express");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const authRoutes = require("./auth");
const { v4: uuidv4 } = require("uuid");

const api = require("./routes/api");

const app = express();

const sessionSecretKey = uuidv4();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.use(
  session({
    secret: sessionSecretKey,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/v1", ensureAuthenticated, api);

app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(morgan("short"));

app.use(express.static(path.join(__dirname, "..", "public")));

// Logout route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});
app.get("/*", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
