const express = require('express');

const authorization = require('../middleware/authorization');
const questionsController = require('../controllers/questions-controller');
const router = express.Router();

router.get('/', authorization, questionsController.getQuestions);

router.post('/', authorization, questionsController.createQuestion);

router.delete(
  '/:questionId',
  authorization,
  questionsController.deleteQuestion
);

module.exports = router;