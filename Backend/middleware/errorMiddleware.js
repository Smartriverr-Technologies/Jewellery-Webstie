// Middleware for handling requests to non-existent routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware (the error handler)
};

// General error handling middleware
const errorHandler = (err, req, res, next) => {
  // If the status code is 200, it means an error occurred in a successful route.
  // Set it to 500 (Internal Server Error) in that case.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // You can add checks for specific Mongoose errors here if you want
  // For example, a Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    // Only show the error stack if we are not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };