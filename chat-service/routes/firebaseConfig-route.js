const express = require('express');
const { jwtAuth } = require('../middleware/authorisation');
const { getConfig } = require('../controllers/firebase-controller');

const router = express.Router();
router.get('/firebase-config', jwtAuth, getConfig);

module.exports = router;