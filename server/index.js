const express = require("express");
const cors = require(cors);
require("dotenv").config();

const api = require("./api/routes.js");

const app = express();

const port = process.env.SERVER_PORT || 8081;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("listening");
});
