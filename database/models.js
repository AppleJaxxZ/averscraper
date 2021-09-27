const mongoose = require("mongoose");

module.exports = dataModel = mongoose.model("Result", {
  schedule: {
    type: String,
  },
});
