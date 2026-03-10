const Joi = require('joi');

const candidateValidationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().min(10).max(20).required(),
  location: Joi.string().trim().min(2).max(100).required(),
  currentCompany: Joi.string().trim().min(2).max(100).required(),
  currentCTC: Joi.string().trim().min(1).max(50).required(),
  skills: Joi.array().items(Joi.string().trim()).min(1).required(),
  experience: Joi.string().valid('0-1', '1-3', '3-5', '5-8', '8-12', '12+').required(),
  resumeLink: Joi.string().optional().allow('')
});

const recruiterValidationSchema = Joi.object({
  company: Joi.string().trim().min(2).max(100).required(),
  contactPerson: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().min(10).max(20).required(),
  message: Joi.string().trim().min(10).max(1000).required()
});

const validateCandidate = (req, res, next) => {
  const { error } = candidateValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  next();
};

const validateRecruiter = (req, res, next) => {
  const { error } = recruiterValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  next();
};

module.exports = {
  validateCandidate,
  validateRecruiter
};
