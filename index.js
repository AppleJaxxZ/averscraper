const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

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
