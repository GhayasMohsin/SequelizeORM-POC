"use-strict";
const teacherRepositry = require("../repositries/teacher");
const classRepositry = require("../repositries/class");

/**
 * function to check if teacher exists
 * @param {*} res
 * @param {*} teacherId
 * @returns
 */
async function isTeacherExists(teacherId) {
  const isTeacherExists = await teacherRepositry.getTeacherById(teacherId);
  if (!isTeacherExists) return false;
  return true;
}

/**
 * function to check if class exists
 * @param {*} res
 * @param {*} classId
 * @returns
 */
async function isClassExists(classId) {
  const classData = await classRepositry.getClassById(classId);
  if (!classData) return { exists: false };
  return { exists: true, data: classData };
}

module.exports = { isTeacherExists, isClassExists };
