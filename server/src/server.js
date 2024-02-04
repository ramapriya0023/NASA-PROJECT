const http = require("http");
const helmet = require("helmet");
const app = require("./app");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");

const { loadPlanetsData } = require("./models/planets.model");
const { connectToDatabase } = require("../config/database");
const { loadLaunchData } = require("./models/launches.model");
const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

app.use(helmet());

async function startServer() {
  connectToDatabase();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
