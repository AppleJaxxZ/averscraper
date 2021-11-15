const { scraper } = require("../scraper");
const path = require("path");
const Result = require("../models/schedule");

const home = (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/../static/index.html"));
};

const login = (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/../static/login.html"));
};

const results = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  scraper(username, password)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
};

module.exports = { home, login, results };
