const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body); // Use `req.query` or `req.params` as needed
  if (error) {
    return res.status(400).send({
      message: 'Invalid request data',
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};

module.exports = validationMiddleware;
