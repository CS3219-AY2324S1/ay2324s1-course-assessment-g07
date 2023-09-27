const express = require('express');

const validinfo = require('../middleware/valid-info');
const authorization = require('../middleware/authorization');
const usersController = require('../controllers/users-controller');
const router = express.Router();

router.get('/', usersController.getUser);

router.post('/login', validinfo, usersController.login);

router.post('/register', validinfo, usersController.register);

router.put('/update', validinfo, usersController.updateUser);

router.get('/is-verify', authorization, usersController.verify);

router.delete('/delete', authorization, usersController.deleteUser);

module.exports = router;
