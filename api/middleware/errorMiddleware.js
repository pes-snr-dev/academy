const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorMessage = res.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    errorMessage = "Resource not found!";
  }
  res.status(statusCode).json({
    errorMessage,
    stack: process.env === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
