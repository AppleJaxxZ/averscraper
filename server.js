const express = require("express");
const app = express();
const routes = require("./routes/datas");
const path = require("path");

const morgan = require("morgan");
app.use(morgan("combined"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
// app.use("/login", routes);
// app.use("/results", routes);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
