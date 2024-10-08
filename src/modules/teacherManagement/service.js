const TeacherRepositry = require("../../../repositries/teacher");
const { sendResponse } = require("../../../utils/response");
const constants = require("../../../utils/constants.json");
const ErrorConstants = require("../../../utils/errors.json");
const SharedService = require("../../../shared/service");

class TeacherService {
  constructor() {
    this.repositry = new TeacherRepositry();
    this.sharedService = new SharedService();
  }

  /**
   * Function to evaluate the Teacher data and add record
   * @param {*} req
   * @param {*} res
   */
  async addTeacher(req, res) {
    let data = req.body;
    if (data.classId) {
      let resp = await this.sharedService.isClassExists(data.classId);
      if (!resp.exists)
        return sendResponse(res, 404, null, ErrorConstants.CLASS_NOT_FOUND);
    }
    let record = await this.repositry.createTeacher(data);
    data.classId ? await record.addClass(data.classId) : null;
    let recordId = record.id;

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
    let classExistance;

    if (
      (data.newClassId && !data.oldClassId) ||
      (data.oldClassId && !data.newClassId)
    )
      return sendResponse(
        res,
        400,
        null,
        ErrorConstants.MISSING_REQUIRED_FIELDS
      );

    if (data.newClassId) {
      classExistance = await this.sharedService.isClassExists(data.newClassId);
      if (!classExistance.exists)
        return sendResponse(res, 404, null, ErrorConstants.CLASS_NOT_FOUND);
    }

    let [teacher] = await Promise.all([
      this.repositry.getTeacherById(id),
      this.repositry.updateTeacher(id, data),
    ]);

    if (data.newClassId)
      await Promise.all([
        teacher.removeClass(data.oldClassId),
        teacher.addClass(classExistance.data),
      ]);

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
   * Function to get all students by Teachers
   * @param {*} req
   * @param {*} res
   */
  async getStudentsByTeacher(req, res) {
    const id = req.query.id;
    let records = await this.repositry.getTeacherById(id);
    records = records
      ? await records.getStudents()
      : // ? await records.getStudents({ where: { firstName: "Waqas" } }) //example to filter
        [];
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
