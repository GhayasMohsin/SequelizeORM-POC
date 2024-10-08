const db = require("../models");

class ClassRepositry {
  constructor() {
    this.class = db.Class;
  }

  async createClass(data) {
    return this.class.create(data);
  }

  async getAllClasss() {
    return this.class.findAll();
  }

  async getClassById(id) {
    return this.class.findOne({ where: { id } });
  }

  async deleteClass(id) {
    return this.class.destroy({ where: { id } });
  }

  async updateClass(id, data) {
    return this.class.update(data, { where: { id } });
  }
}

module.exports = ClassRepositry;
