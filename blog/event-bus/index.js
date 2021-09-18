const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:8080/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8081/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8082/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8083/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

let appServer = app.listen(8085, () => {
  console.log("Listening on 8085");
});

//-------------------------------
//Graceful Shutdown Node Specific
// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// shut down server
function shutdown() {
  // NOTE: server.close is for express based apps
  // If using hapi, use `server.stop`
  appServer.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
