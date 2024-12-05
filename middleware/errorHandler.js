class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode || 500;
      this.isOperational = true; // Distinguish operational errors
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    console.error(`[${new Date().toISOString()}] Error: ${message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack);
    }
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = { AppError, errorHandler };
  