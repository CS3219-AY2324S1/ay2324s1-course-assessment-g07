const express = require('express');
const createWebSocketServer = require('./controllers/matchmaking-controller');

const matchmakingController = require('../controllers/matchmaking-controller');
const router = express.Router();

// router.get('/', usersController.getUser);

// router.post('/login', validinfo, usersController.login);

// router.post('/register', validinfo, usersController.register);

// router.put('/update', validinfo, usersController.updateUser);

// router.get('/is-verify', authorization, usersController.verify);

// router.delete('/delete', authorization, usersController.deleteUser);

module.exports = router;