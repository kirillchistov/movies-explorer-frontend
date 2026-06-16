const urlValidatorMessage = 'Строка должна содержать ссылку!';
const userExistErrorMessage = 'Пользователь с таким email уже существует';
const BadRequestErrorMessage = 'Переданные данные некорректны';
const requiredValidationMessage = (name) => `Поле "${name}" является обязательным`;

module.exports = {
  urlValidatorMessage,
  userExistErrorMessage,
  BadRequestErrorMessage,
  requiredValidationMessage,
};

export {};
