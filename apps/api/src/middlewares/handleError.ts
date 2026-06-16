//  Центральный обработчик - теперь в единственном числе  //
//  Ответ с ошибкой по умолчанию - вызывается из next  //
const handleError = (err, req, res, _next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка ${message} (${err.name})`
        : message,
    });
};

module.exports = { handleError };

export {};
