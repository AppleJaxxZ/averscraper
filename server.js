const express = require("express");
const app = express();
const routes = require("./routes/datas");
const mongoose = require("mongoose");

const morgan = require("morgan");
app.use(morgan("combined"));

app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);

  mongoose
    .connect("mongodb://127.0.0.1:27017/scraperData", {
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Bootstrapped to MongoDB...Now watching.");
    })
    .catch(() => {
      console.log("Connection failed.");
    });

  // const User = conn.model("Result", new Schema({ name: String }));

  // const changeStream = conn.watch().on("change", (data) => console.log(data));
  // User.create({ name: "test" });
});
