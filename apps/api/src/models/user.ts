//  В проекте две сущности: пользователи и сохранённые фильмы (users и movies)  //
//  Создайте схему и модель для каждой. саму БД назовите, например /bitfilmsdb  //
/* Поля схемы user:
email — почта пользователя. Обязательное уникальное. Валидировать по схеме email.
password — хеш пароля. Обязательная строка. Задать поведение по умолчанию.
name — имя, напр: Александр или Мария. Обязательная строка 2 - 30 символов.
*/

//  Создаем подключение к mongoose, валидацию и хэширование паролей  //

const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Некорректный формат email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина строки - 2 символа'],
      maxlength: [30, 'Максимальная длина строки - 30 символов'],
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

//  eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Некорректный email'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Некорректный пароль'));
          }
          //  console.log(`user ${user}`);  //
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

export {};
