const express = require('express');

const authorization = require('../middleware/authorization');
const historyController = require('../controllers/history-controller');
const router = express.Router();

router.get('/:userId', authorization, historyController.getHistory);

router.post('/', authorization, historyController.addHistory);

module.exports = router;