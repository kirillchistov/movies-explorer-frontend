//  Роуты для пользователей (2) Get users/me и Patch users/me //
//  Удалить getUsers до или после review  //
const router = require('express').Router();
const {
  getCurrentUser,
  //  getUsers,  //
  updateProfile,
} = require('../controllers/users');
const { validateProfileUpdate } = require('../middlewares/validate-user');

router.get('/me', getCurrentUser);
//  router.get('/', getUsers);  //
router.patch('/me', validateProfileUpdate, updateProfile);

module.exports = router;

export {};
