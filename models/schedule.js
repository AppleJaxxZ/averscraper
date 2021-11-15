const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    schedule: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
