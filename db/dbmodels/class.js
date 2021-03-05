const mongoose = require("mongoose");

const ClasssSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  classname: {
    type: String,
  },
  numberOfStudents: {
    type: Number,
    trim: true,
    minlength: 3,
  },
  sub1: {
    type: String,
  },
  q1: {
    type: String,
  },
  q2: {
    type: String,
  },
  q3: {
    type: String,
  },
  sub2: {
    type: String,
  },
  q4: {
    type: String,
  },
  q5: {
    type: String,
  },
  q6: {
    type: String,
  },
  sub3: {
    type: String,
  },
  q7: {
    type: String,
  },
  q8: {
    type: String,
  },
  q9: {
    type: String,
  },
  q10: {
    type: String,
  },
});
const Classs = mongoose.model("Classs", ClasssSchema);
module.exports = Classs;
