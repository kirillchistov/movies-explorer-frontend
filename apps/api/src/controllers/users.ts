const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const IncorrectDataError = require('../utils/errors/incorrect-data-error');
const ConflictError = require('../utils/errors/conflict-error');
const NoDataError = require('../utils/errors/no-data-error');
const UnauthorizedError = require('../utils/errors/unauthorized-error');

//  Контроллер логина  //
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const userId = user._id.toString();
      const token = jwt.sign(
        { _id: userId },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '30d' },
      );
      /* вернём cookie и body
      res.cookie('jwt', token, {
        maxAge: 3600 * 24 * 30,
        httpOnly: true,
      })
      */

      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        const error = new UnauthorizedError('Неправильные почта или пароль');
        return next(error);
      }
      return next(err);
    });
};

//  Получаем всех пользователей - удалить до или после review  //
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

//  Получение текущего юзера  - по user._id  //
module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NoDataError(`Пользователь с id ${req.params.userId} не найден`));
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

//  Создание пользователя  //
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({
      data: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError(`${req.body.email} - такой пользователь уже зарегистрирован`));
      } else {
        next(err);
      }
    });
};

//  Обновление данных профиля  //
module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true, upsert: false })
    .orFail(new NoDataError(`Пользователь с id: ${req.params.userId} не найден`))
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictError(`${email} - такой пользователь уже зарегистрирован`));
      }
      return next(err);
    });
};

//  Контроллер логаута  //
/* module.exports.logout = (req, res) => {
//  res.clearCookie('token').send({ message: 'Ваша сессия завершена' });  //
};
*/

export {};
