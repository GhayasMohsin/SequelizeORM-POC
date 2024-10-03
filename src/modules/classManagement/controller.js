const router = require("express").Router();
const service = new (require("./service"))();

router.post("/add_class", (req, res) => {
  service.addClass(req, res);
});

router.put("/update_class", (req, res) => {
  service.updateClass(req, res);
});

router.get("/get_classes", (req, res) => {
  service.getAllClasses(req, res);
});

router.delete("/delete_class", (req, res) => {
  service.deleteClass(req, res);
});

module.exports = router;
