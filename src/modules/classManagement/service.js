"use-strict";
const classRepositry = require("../../../repositries/class");
const { sendResponse } = require("../../../utils/response");
const Constants = require("../../../utils/constants.json");
const ErrorConstants = require("../../../utils/errors.json");
const sharedService = require("../../../shared/service");

/**
 * Function to evaluate the class data and add record
 * @param {*} req
 * @param {*} res
 */
async function addClass(req, res) {
  const data = req.body;

  if (data.teacherId) {
    const exists = await sharedService.isTeacherExists(data.teacherId);
    if (!exists)
      return sendResponse(res, 404, null, ErrorConstants.TEACHER_NOT_FOUND);
  }

  let record = await classRepositry.createClass(data);
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
async function updateClass(req, res) {
  let id = req.query.id;
  let data = req.body;
  await classRepositry.updateClass(id, data);
  sendResponse(res, 200, Constants.updated, Constants.record_Updated);
}

/**
 * Function to get all classes
 * @param {*} req
 * @param {*} res
 */
async function getAllClasses(req, res) {
  let records = await classRepositry.getAllClasss();
  sendResponse(res, 200, Constants.success, null, records);
}

/**
 * Function to delete class
 * @param {*} req
 * @param {*} res
 */
async function deleteClass(req, res) {
  let id = req.query.id;
  let result = await classRepositry.deleteClass(id);
  sendResponse(
    res,
    200,
    Constants.success,
    result ? Constants.record_Deleted : Constants.record_Not_Found
  );
}

module.exports = { addClass, updateClass, getAllClasses, deleteClass };
