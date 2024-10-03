require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models/index");
const classRouter = require("./src/modules/classManagement/controller");
const teacherRouter = require("./src/modules/teacherManagement/controller");
const studentRouter = require("./src/modules/studentManagement/controller");
const constants = require("./utils/constants.json");

app.use(express.json());
db.sequelize.sync();

app.use(constants.student_route, studentRouter);
app.use(constants.class_route, classRouter);
app.use(constants.teacher_route, teacherRouter);

app.listen(process.env.Localhost_PORT, () => {
  console.log("running");
});
