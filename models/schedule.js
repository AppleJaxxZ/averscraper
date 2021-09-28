const mongoose = require("mongoose");

const Schedule = mongoose.model("res", {
  schedule: {
    type: String,
    trim: true,
  },
});

module.exports = Schedule;
