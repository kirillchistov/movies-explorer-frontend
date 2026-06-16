//  Класс ошибки для кейса 401: ошибка авторизации  //
class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;

export {};
