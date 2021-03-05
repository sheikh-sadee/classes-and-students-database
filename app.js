const express = require("express");
const mongoose = require("./db/dbmodels/mongoose");
const myclass = require("./db/dbmodels/class");
const student = require("./db/dbmodels/student");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD,OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept"
  );
  next();
});
app.post("/myclass", (req, res) => {
  new myclass({
    _id: req.body._id,
    className: req.body.className,
    numberOfStudents: req.body.numberOfStudents,
    sub1: req.body.sub1,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    sub2: req.body.sub2,
    q4: req.body.q4,
    q5: req.body.q5,
    q6: req.body.q6,
    sub3: req.body.sub3,
    q7: req.body.q7,
    q8: req.body.q8,
    q9: req.body.q9,
    q10: req.body.q10,
  })
    .save()
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error));
});

app.post("/myclass/:myclassId/students", (req, res) => {
  new student({
    name: req.body.name,
    lastName: req.body.lastName,
    _classId: req.params.myclassId,
  })
    .save()
    .then((student) => res.send(student))
    .catch((error) => console.log(error));
});
app.get("/myclass", (req, res) => {
  myclass
    .find({})
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error));
});
app.get("/myclass/:myclassId/students", async (req, res) => {
  const students = await student
    .find({ _classId: req.params.myclassId })
    .populate("_classId")
    .then((student) => res.send(student))
    .catch((error) => console.log(error));
  res.send(students);
});
app.get("/myclass/:myclassId/students/:studentId", async (req, res) => {
  const students = await student
    .findOne({ _classId: req.params.myclassId, _id: req.params.studentId })
    .populate("_classId")
    .then((onestudent) => res.send(onestudent))
    .catch((error) => console.log(error));
});
app.patch("/myclass/:myclassId", (req, res) => {
  myclass
    .findOneAndUpdate({ _id: req.params.myclassId }, { $set: req.body })
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error));
});
app.patch("/myclass/:myclassId/students/:studentId", (req, res) => {
  student
    .findOneAndUpdate(
      { _id: req.params.myclassId, _id: req.params.studentId },
      { $set: req.body }
    )
    .then((student) => res.send(student))
    .catch((error) => console.log(error));
});
app.delete("/myclass/:myclassId/students/:studentId", (req, res) => {
  student
    .findOneAndDelete({
      _id: req.params.studentId,
      _classId: req.params.myclassId,
    })
    .then((student) => res.send(student))
    .catch((error) => console.log(error));
});
app.delete("/myclass/:myclassId", (req, res) => {
  const deleteStudents = (myclass) => {
    student
      .deleteMany({ _id: req.params.myclassId })
      .then(() => myclass)
      .catch((error) => console.log(error));
  };
  myclass
    .findByIdAndDelete({ _id: req.params.myclassId })
    .then((myclass) => res.send(deleteStudents(myclass)))
    .catch((error) => console.log(error));
});
app.listen(3000, () => console.log("Listening on port 3000"));
