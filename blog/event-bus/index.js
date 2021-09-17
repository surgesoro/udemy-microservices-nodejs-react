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

app.listen(8085, () => {
  console.log("Listening on 8085");
});
