const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { connectToDatabase } = require("../config/database");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer() {
  connectToDatabase();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
