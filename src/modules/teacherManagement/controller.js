const router = require("express").Router();
const service = new (require("./service"))();

router.post("/add_teacher", (req, res) => {
  service.addTeacher(req, res);
});

router.put("/update_teacher", (req, res) => {
  service.updateTeacher(req, res);
});

router.get("/get_teachers", (req, res) => {
  service.getAllTeachers(req, res);
});

router.delete("/delete_teacher", (req, res) => {
  service.deleteTeacher(req, res);
});

module.exports = router;
