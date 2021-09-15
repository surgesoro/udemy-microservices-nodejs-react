const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:8080/events", event).catch((error) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8081/events", event).catch((error) => {
    console.log(err.message);
  });
  axios.post("http://localhost:8082/events", event).catch((error) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(8085, () => {
  console.log("Listening on 8085");
});
