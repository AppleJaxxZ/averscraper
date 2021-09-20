const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

// Route to Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

// Route to Login Page
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});

const passwordArray = [];
const usernameArray = [];
app.post("/login", (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  usernameArray.push(username);

  let password = req.body.password;
  passwordArray.push(password);

  res.send(`Username: ${username} Password: ${password}`);
  console.log(usernameArray[0].toString());
  console.log(passwordArray[0].toString());
});

const port = 3000; // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));
