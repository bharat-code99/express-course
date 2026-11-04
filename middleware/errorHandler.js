const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || "There is some issue",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
