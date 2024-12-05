const Joi = require('joi');

const signinSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('admin', 'faculty', 'supervisor').required(),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('active', 'suspended', 'deactivated').required(),
});


module.exports = {
  signinSchema,
  signupSchema,
  updateStatusSchema,
};
