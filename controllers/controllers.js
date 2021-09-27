const { scraper } = require("../scraper");
const path = require("path");

const home = (req, res) => {
  res.sendFile(path.join(__dirname + "/../static/index.html"));
};

const login = (req, res) => {
  res.sendFile(path.join(__dirname + "/../static/login.html"));
};

const results = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  scraper(username, password)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { home, login, results };
