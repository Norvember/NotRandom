const express = require("express");
const { hostname } = require("os");
const path = require("path");
const app = express();
const PORT = 3000;
var activeSocket = null;
var shouldFetchData = true;

const { getBytesLoaded } = require("./public/js/Server/fileReader");
applyDependencies(app);

tryStartServer();


async function tryStartServer() {
  if (shouldFetchData) {
    const [bits, index] = await getBytesLoaded();
    app.get("/data", (req, res) => {
      res.json({ bits, index });
    });
    startServer();
  } else {
    startServer();
  }
}

function startServer() {
  var server = app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });

  server.on("connection", (socket) => {
    console.log("Socket ' + socket + ' has been established.");
    activeSocket = socket;
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error("Address in use, retrying...");
      server.close(() => {
        if (activeSocket) activeSocket.destroy();
        server.listen(PORT, hostname);
      });
    } else {
      console.error("Error occurred:", error);
    }
  });
}

function applyDependencies(app) {
  app.use(express.static(__dirname + "/public"));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "public/views"));

  app.get("/", (req, res) => {
    res.render("index");
  });
  // app.use("/leaflet", express.static(__dirname + "/node_modules/leaflet/dist"));
}
