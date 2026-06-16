//  Класс ошибки для кейса 404: ошибка авторизации  //
class NoDataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NoDataError;

export {};
