"use-strict";
const ClassRepositry = require("../../../repositries/class");
const { sendResponse } = require("../../../utils/response");
const Constants = require("../../../utils/constants.json");
const ErrorConstants = require("../../../utils/errors.json");
const SharedService = require("../../../shared/service");

class ClassService {
  constructor() {
    this.classRepositry = new ClassRepositry();
    this.sharedService = new SharedService();
  }

  /**
   * Function to evaluate the class data and add record
   * @param {*} req
   * @param {*} res
   */
  async addClass(req, res) {
    const data = req.body;

    if (data.teacherId) {
      const exists = await this.sharedService.isTeacherExists(data.teacherId);
      if (!exists)
        return sendResponse(res, 404, null, ErrorConstants.TEACHER_NOT_FOUND);
    }

    let record = await this.classRepositry.createClass(data);
    data.teacherId ? await record.addTeacher(data.teacherId) : null;
    let recordId = record.id;
    sendResponse(
      res,
      201,
      Constants.created,
      Constants.record_Created,
      null,
      recordId
    );
  }

  /**
   * Function to evaluate the class data and update record
   * @param {*} req
   * @param {*} res
   */
  async updateClass(req, res) {
    let id = req.query.id;
    let data = req.body;
    await this.classRepositry.updateClass(id, data);
    sendResponse(res, 200, Constants.updated, Constants.record_Updated);
  }

  /**
   * Function to get all classes
   * @param {*} req
   * @param {*} res
   */
  async getAllClasses(req, res) {
    let records = await this.classRepositry.getAllClasss();
    sendResponse(res, 200, Constants.success, null, records);
  }

  /**
   * Function to delete class
   * @param {*} req
   * @param {*} res
   */
  async deleteClass(req, res) {
    let id = req.query.id;
    let result = await this.classRepositry.deleteClass(id);
    sendResponse(
      res,
      200,
      Constants.success,
      result ? Constants.record_Deleted : Constants.record_Not_Found
    );
  }
}

module.exports = ClassService;
