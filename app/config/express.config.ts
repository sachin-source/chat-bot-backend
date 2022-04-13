var express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

const databaseUrl = 'mongodb://localhost:27017/chat';
mongoose.connect(databaseUrl, { useUnifiedTopology: true, useNewUrlParser: true }, function (err: any) {
  const status = err ? "Could not connect to chat database" : "Connected to chat database";
  console.log(status)
});

app.use(bodyParser.json());
app.use(cors())
export { app };