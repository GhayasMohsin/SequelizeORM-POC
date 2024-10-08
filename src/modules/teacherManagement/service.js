const teacherRepositry = require("../../../repositries/teacher");
const { sendResponse } = require("../../../utils/response");
const constants = require("../../../utils/constants.json");
const ErrorConstants = require("../../../utils/errors.json");
const sharedService = require("../../../shared/service");

/**
 * Function to evaluate the Teacher data and add record
 * @param {*} req
 * @param {*} res
 */
async function addTeacher(req, res) {
  let data = req.body;
  if (data.classId) {
    let resp = await sharedService.isClassExists(data.classId);
    if (!resp.exists)
      return sendResponse(res, 404, null, ErrorConstants.CLASS_NOT_FOUND);
  }
  let record = await teacherRepositry.createTeacher(data);
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
async function updateTeacher(req, res) {
  let id = req.query.id;
  let data = req.body;
  let classExistance;

  if (
    (data.newClassId && !data.oldClassId) ||
    (data.oldClassId && !data.newClassId)
  )
    return sendResponse(res, 400, null, ErrorConstants.MISSING_REQUIRED_FIELDS);

  if (data.newClassId) {
    classExistance = await sharedService.isClassExists(data.newClassId);
    if (!classExistance.exists)
      return sendResponse(res, 404, null, ErrorConstants.CLASS_NOT_FOUND);
  }

  let [teacher] = await Promise.all([
    teacherRepositry.getTeacherById(id),
    teacherRepositry.updateTeacher(id, data),
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
async function getAllTeachers(req, res) {
  let records = await teacherRepositry.getAllTeachers();
  sendResponse(res, 200, constants.success, null, records);
}

/**
 * Function to get all students by Teachers
 * @param {*} req
 * @param {*} res
 */
async function getStudentsByTeacher(req, res) {
  const id = req.query.id;
  let records = await teacherRepositry.getTeacherById(id);
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
async function deleteTeacher(req, res) {
  let id = req.query.id;
  let result = await teacherRepositry.deleteTeacher(id);
  sendResponse(
    res,
    200,
    constants.success,
    result ? constants.record_Deleted : constants.record_Not_Found
  );
}

module.exports = {
  addTeacher,
  updateTeacher,
  getAllTeachers,
  getStudentsByTeacher,
  deleteTeacher,
};
