const model = require("../models").Student;

async function createStudent(data) {
  return model.create(data);
}

async function getAllStudents() {
  return model.findAll();
}

async function getStudentById(id) {
  return model.findOne({ where: { id }, include: "Teacher" });
}

async function deleteStudent(id) {
  return model.destroy({ where: { id } });
}

async function updateStudent(id, data) {
  return model.update(data, { where: { id } });
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
};
