const sendResponse = (res, statusCode, status, message, records, recordId) => {
  let obj = {};
  if (status) obj.status = status;
  if (message) obj.message = message;
  if (records) obj.records = records;
  if (recordId) obj.recordId = recordId;

  res.status(statusCode).json(obj);
};

module.exports = { sendResponse };
