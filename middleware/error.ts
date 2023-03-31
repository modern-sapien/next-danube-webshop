//@ts-nocheck
import ErrorResponse from "../utils/errorResponse"

const errorHandler = (err, req, res, next) => {
  let error ={...err}
  console.log(err.stack.red);
  console.log(err.name)

  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }


  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
