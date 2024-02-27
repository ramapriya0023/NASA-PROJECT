const http = require("http");
const app = require("./app");
require("dotenv").config();

const { loadPlanetsData } = require("./models/planets.model");
const { connectToDatabase } = require("../config/database");
const { loadLaunchData } = require("./models/launches.model");
const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer() {
  connectToDatabase();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
