const router = require("express").Router();
const service = require("./service");

router.post("/add_student", (req, res) => {
  service.addStudent(req, res);
});

router.put("/update_student", (req, res) => {
  service.updateStudent(req, res);
});

router.get("/get_students", (req, res) => {
  service.getAllStudents(req, res);
});

router.get("/get_student_by_Id", (req, res) => {
  service.getStudentById(req, res);
});

router.delete("/delete_student", (req, res) => {
  service.deleteStudent(req, res);
});

module.exports = router;
