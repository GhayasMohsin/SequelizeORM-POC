const db = require("../models");

class StudentRepositry {
  constructor() {
    this.student = db.Student;
  }

  async createStudent(data) {
    return this.student.create(data);
  }

  async getAllStudents() {
    return this.student.findAll();
  }

  async deleteStudent(id) {
    return this.student.destroy({ where: { id } });
  }

  async updateStudent(id, data) {
    return this.student.update(data, { where: { id } });
  }
}

module.exports = StudentRepositry;
