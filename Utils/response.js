/**
 * Send an error JSON
 * @param res - response object
 * @param code - status code
 * @param message - error message
 * @returns {Object} - JSON response
 */
const errorResMsg = (res,success, code, message,status) => res.status(code).json({
    success: success,
    status: status,
    message: message,
  });
  
  /**
   * Success JSON to be sent
   * @param res - response Object
   * @param code - status code
   * @param responseData - data to be sent, it requires a message object
   * @returns {Object} - JSON response
   */
  const successResMsg = (res,success, message, code, responseData) => res.status(code).json({
        success: success,
      message:message,
      data:responseData,
    });
  
  
  const redirect = (res, url) => res.status(302).redirect(url);
  
  module.exports = {
    errorResMsg,
    successResMsg,
    redirect,
  }