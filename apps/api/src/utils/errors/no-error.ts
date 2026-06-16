//  Класс ошибки для кейса 409: регистрация с email, который есть в базе  //
class NoError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 200;
  }
}

module.exports = NoError;

export {};
