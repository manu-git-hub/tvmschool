const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).send({
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;
  