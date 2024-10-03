const TeacherRepositry = require("../../../repositries/teacher");
const { sendResponse } = require("../../../utils/response");
const constants = require("../../../utils/constants.json");

class TeacherService {
  constructor() {
    this.repositry = new TeacherRepositry();
  }

  /**
   * Function to evaluate the Teacher data and add record
   * @param {*} req
   * @param {*} res
   */
  async addTeacher(req, res) {
    let data = req.body;
    let recordId = (await this.repositry.createTeacher(data)).id;
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
   * Function to evaluate the Teacher data and update record
   * @param {*} req
   * @param {*} res
   */
  async updateTeacher(req, res) {
    let id = req.query.id;
    let data = req.body;
    await this.repositry.updateTeacher(id, data);
    sendResponse(res, 200, constants.updated, constants.record_Updated);
  }

  /**
   * Function to get all Teachers
   * @param {*} req
   * @param {*} res
   */
  async getAllTeachers(req, res) {
    let records = await this.repositry.getAllTeachers();
    sendResponse(res, 200, constants.success, null, records);
  }

  /**
   * Function to delete Teacher
   * @param {*} req
   * @param {*} res
   */
  async deleteTeacher(req, res) {
    let id = req.query.id;
    let result = await this.repositry.deleteTeacher(id);
    sendResponse(
      res,
      200,
      constants.success,
      result ? constants.record_Deleted : constants.record_Not_Found
    );
  }
}

module.exports = TeacherService;
