const router = require("express").Router();
const service = require("./service");

router.post("/add_teacher", (req, res) => {
  service.addTeacher(req, res);
});

router.put("/update_teacher", (req, res) => {
  service.updateTeacher(req, res);
});

router.get("/get_teachers", (req, res) => {
  service.getAllTeachers(req, res);
});

router.get("/get_students_by_teacherId", (req, res) => {
  service.getStudentsByTeacher(req, res);
});

router.delete("/delete_teacher", (req, res) => {
  service.deleteTeacher(req, res);
});

module.exports = router;
