const { constants } = require("../constants");
const { stack } = require("../routes/contactRoutes");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode)
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNOTHORIZED:
      res.json({
        title:"UNOTHORIZED",
        message:err.message,
        stackTrace:err.stack
      })
      break ;
    case constants.NOT_FOUND:
      res.json({
        title: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      break;
  }
  res.status(statusCode);
};

module.exports = errorHandler;
