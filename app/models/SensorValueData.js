var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SensorValueSchema = new Schema({
  Moisture: String,
  Temperature: String,
  DigitalAnalog: String,
  TimeStamp: String,
  Parameter1: String,
  Parameter2: String,
  Parameter3: String,
  Parameter4: String,
  Parameter5: String,
  Parameter6: String
});

SensorValueSchema.pre("save", function(next) {
  next();
});
module.exports = mongoose.model("SensorValueData", SensorValueSchema);
