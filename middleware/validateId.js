const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    const error = new Error("Invalid ID. Please provide a valid positive integer ID");
    error.status = 400;
    return next(error);
  }

  req.postId = id;

  next();
};

export default validateId;
