//  Класс ошибки для кейса 409: регистрация с email, который есть в базе  //
class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;

export {};
