const { HttpError } = require("../utils/httpError");

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  if (error.name === "MulterError") {
    res.status(400).json({ error: error.message });
    return;
  }

  if (error.type === "entity.parse.failed") {
    res.status(400).json({ error: "Invalid JSON body." });
    return;
  }

  console.error(error);
  res.status(error.statusCode || error.status || 500).json({
    error: error.statusCode === 400 || error.status === 400 ? error.message : "Unexpected server error",
  });
}

module.exports = errorHandler;
