const IncorrectDataError = require('../utils/errors/incorrect-data-error');

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[property], {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    return next(new IncorrectDataError('Переданы некорректные данные'));
  }

  return next();
};

module.exports = validate;

export {};
