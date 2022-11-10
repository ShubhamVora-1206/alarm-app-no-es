const mongoose = require('mongoose');
const { Schema } = mongoose;

const alarmSchema = new Schema({
  text:  String, // String is shorthand for {type: String}
  createdBy: String,
  userId:String,
  time:   String,
  date: String,
  complete: {
    type:Boolean,
    default: false
  }
});

const alarmModel = new mongoose.model("alarm",alarmSchema);
module.exports = alarmModel;