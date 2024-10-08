"use-strict";
const StudentRepositry = require("../repositries/student");
const TeacherRepositry = require("../repositries/teacher");
const ClassRepositry = require("../repositries/class");
const ErrorConstants = require("../utils/errors.json");
const { sendResponse } = require("../utils/response");

class SharedService {
  constructor() {
    this.studentRepositry = new StudentRepositry();
    this.teacherRepositry = new TeacherRepositry();
    this.classRepositry = new ClassRepositry();
  }

  /**
   * function to check if teacher exists
   * @param {*} res
   * @param {*} teacherId
   * @returns
   */
  async isTeacherExists(teacherId) {
    const isTeacherExists = await this.teacherRepositry.getTeacherById(
      teacherId
    );
    if (!isTeacherExists) return false;
    return true;
  }

  /**
   * function to check if class exists
   * @param {*} res
   * @param {*} classId
   * @returns
   */
  async isClassExists(classId) {
    const classData = await this.classRepositry.getClassById(classId);
    if (!classData) return { exists: false };
    return { exists: true, data: classData };
  }
}

module.exports = SharedService;
