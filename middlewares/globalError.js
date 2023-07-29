const ApiError = require("../utils/ApiError");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const handleJwtErrors = (err) => {
  let message;
  if (err === "JsonWebTokenError") {
    message = new ApiError("Invalid token, please longin again...", 401);
  } else if (err === "TokenExpiredError") {
    message = new ApiError("Token expired, please longin again...", 401);
  }
  return message;
};

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError")
      err = handleJwtErrors("JsonWebTokenError");
    if (err.name === "TokenExpiredError")
      err = handleJwtErrors("TokenExpiredError");
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
