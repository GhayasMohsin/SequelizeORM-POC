const model = require("../models").Class;

async function createClass(data) {
  return model.create(data);
}

async function getAllClasss() {
  return model.findAll();
}

async function getClassById(id) {
  return model.findOne({ where: { id } });
}

async function deleteClass(id) {
  return model.destroy({ where: { id } });
}

async function updateClass(id, data) {
  return model.update(data, { where: { id } });
}

module.exports = {
  createClass,
  getAllClasss,
  getClassById,
  deleteClass,
  updateClass,
};
