const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(morgan("combined"));

const scrape = require("./scraper");

require("dotenv").config();
// const schedule = require("./scheduler");

app.use(cors());

app.get("/averscrape", (req, res) => {
  res.send(scrape);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
