const StudentRepositry = require("../../../repositries/student");
const { sendResponse } = require("../../../utils/response");
const constants = require("../../../utils/constants.json");

class StudentService {
  constructor() {
    this.repositry = new StudentRepositry();
  }

  /**
   * Function to evaluate the Student data and add record
   * @param {*} req
   * @param {*} res
   */
  async addStudent(req, res) {
    let data = req.body;
    let recordId = (await this.repositry.createStudent(data)).id;
    sendResponse(
      res,
      201,
      constants.created,
      constants.record_Created,
      null,
      recordId
    );
  }

  /**
   * Function to evaluate the Student data and update record
   * @param {*} req
   * @param {*} res
   */
  async updateStudent(req, res) {
    let id = req.query.id;
    let data = req.body;
    await this.repositry.updateStudent(id, data);
    sendResponse(res, 200, constants.updated, constants.record_Updated);
  }

  /**
   * Function to get all Students
   * @param {*} req
   * @param {*} res
   */
  async getAllStudents(req, res) {
    let records = await this.repositry.getAllStudents();
    sendResponse(res, 200, constants.success, null, records);
  }

  /**
   * Function to delete Student
   * @param {*} req
   * @param {*} res
   */
  async deleteStudent(req, res) {
    let id = req.query.id;
    let result = await this.repositry.deleteStudent(id);
    sendResponse(
      res,
      200,
      constants.success,
      result ? constants.record_Deleted : constants.record_Not_Found
    );
  }
}

module.exports = StudentService;
