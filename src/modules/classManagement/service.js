const ClassRepositry = require("../../../repositries/class");
const { sendResponse } = require("../../../utils/response");
const constants = require("../../../utils/constants.json");

class ClassService {
  constructor() {
    this.repositry = new ClassRepositry();
  }

  /**
   * Function to evaluate the class data and add record
   * @param {*} req
   * @param {*} res
   */
  async addClass(req, res) {
    let data = req.body;
    let recordId = (await this.repositry.createClass(data)).id;
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
   * Function to evaluate the class data and update record
   * @param {*} req
   * @param {*} res
   */
  async updateClass(req, res) {
    let id = req.query.id;
    let data = req.body;
    await this.repositry.updateClass(id, data);
    sendResponse(res, 200, constants.updated, constants.record_Updated);
  }

  /**
   * Function to get all classes
   * @param {*} req
   * @param {*} res
   */
  async getAllClasses(req, res) {
    let records = await this.repositry.getAllClasss();
    sendResponse(res, 200, constants.success, null, records);
  }

  /**
   * Function to delete class
   * @param {*} req
   * @param {*} res
   */
  async deleteClass(req, res) {
    let id = req.query.id;
    let result = await this.repositry.deleteClass(id);
    sendResponse(
      res,
      200,
      constants.success,
      result ? constants.record_Deleted : constants.record_Not_Found
    );
  }
}

module.exports = ClassService;
