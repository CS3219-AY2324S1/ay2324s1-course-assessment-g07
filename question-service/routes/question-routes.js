const express = require('express');

const authorization = require('../middleware/authorization');
const questionsController = require('../controllers/questions-controller');
const router = express.Router();

router.get('/',  authorization, questionsController.getQuestions);

router.get('/randomQuestion', questionsController.getRandomQuestion);

router.post('/', authorization, questionsController.createQuestion);

router.put('/', authorization, questionsController.updateQuestion);

router.delete(
  '/:questionId',
  authorization,
  questionsController.deleteQuestion
);

module.exports = router;