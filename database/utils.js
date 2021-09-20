const getTextResult = (scheduleText) => {
  const mongoose = require("mongoose");

  const dataModel = mongoose.model("Result", {
    schedule: {
      type: String,
    },
  });

  const result = new dataModel({
    schedule: scheduleText,
  });

  result
    .save()
    .then(() => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = getTextResult;
