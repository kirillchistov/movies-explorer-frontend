//  Класс ошибки для кейса 400: ошибка валидации данных  //
class IncorrectDataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = IncorrectDataError;

export {};
