const mongoose = require("mongoose");

const Schedule = mongoose.model("Schedule", {
  schedule: {
    type: String,
  },
});

module.exports = Schedule;
