const model = require("../models").Teacher;

async function createTeacher(data) {
  return model.create(data);
}

async function getAllTeachers() {
  return model.findAll();
}

async function getTeacherById(id) {
  return model.findOne({ where: { id } });
}

async function deleteTeacher(id) {
  return model.destroy({ where: { id } });
}

async function updateTeacher(id, data) {
  return model.update(data, { where: { id } });
}

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
};
