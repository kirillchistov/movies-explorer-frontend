//  Логирование запросов и ошибок  //
const winston = require('winston');

const requestLog = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLog = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

const requestLogger = (req, res, next) => {
  requestLog.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
};

const errorLogger = (err, req, res, next) => {
  errorLog.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });
  next(err);
};

module.exports = {
  requestLogger,
  errorLogger,
};

export {};
