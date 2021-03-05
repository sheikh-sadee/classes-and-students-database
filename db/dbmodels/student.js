const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    trim: true,
  },
  _classId: {
    type: mongoose.Types.ObjectId,
    ref: "Classs",
    required: true,
  },
});
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
