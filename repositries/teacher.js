const db = require("../models");

class TeacherRepositry {
  constructor() {
    this.teacher = db.Teacher;
  }

  async createTeacher(data) {
    return this.teacher.create(data);
  }

  async getAllTeachers() {
    return this.teacher.findAll();
  }

  async deleteTeacher(id) {
    return this.teacher.destroy({ where: { id } });
  }

  async updateTeacher(id, data) {
    return this.teacher.update(data, { where: { id } });
  }
}

module.exports = TeacherRepositry;
