const studentRepositry = require("../../../repositries/student");
const { sendResponse } = require("../../../utils/response");
const Constants = require("../../../utils/constants.json");
const ErrorConstants = require("../../../utils/errors.json");
const sharedService = require("../../../shared/service");

/**
 * Function to evaluate the Student data and add record
 * @param {*} req
 * @param {*} res
 */
async function addStudent(req, res) {
  let data = req.body;
  let exists = await sharedService.isTeacherExists(data.teacherId);

  if (!exists) return sendResponse(404, null, ErrorConstants.TEACHER_NOT_FOUND);

  let recordId = (await studentRepositry.createStudent(data)).id;
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
 * Function to evaluate the Student data and update record
 * @param {*} req
 * @param {*} res
 */
async function updateStudent(req, res) {
  let id = req.query.id;
  let data = req.body;
  await studentRepositry.updateStudent(id, data);
  sendResponse(res, 200, Constants.updated, Constants.record_Updated);
}

/**
 * Function to get all Students
 * @param {*} req
 * @param {*} res
 */
async function getAllStudents(req, res) {
  let records = await studentRepositry.getAllStudents();
  sendResponse(res, 200, Constants.success, null, records);
}

/**
 * Function to get Student by Id
 * @param {*} req
 * @param {*} res
 */
async function getStudentById(req, res) {
  let id = req.query.id;
  let records = await studentRepositry.getStudentById(id);
  sendResponse(
    res,
    404,
    records ? Constants.success : null,
    records ? null : Constants.record_Not_Found,
    records
  );
}

/**
 * Function to delete Student
 * @param {*} req
 * @param {*} res
 */
async function deleteStudent(req, res) {
  let id = req.query.id;
  let result = await studentRepositry.deleteStudent(id);
  sendResponse(
    res,
    404,
    Constants.success,
    result ? Constants.record_Deleted : Constants.record_Not_Found
  );
}

module.exports = {
  addStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
};
