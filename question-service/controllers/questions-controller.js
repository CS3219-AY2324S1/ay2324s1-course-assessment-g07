const Question = require('../models/question');

const getQuestions = async (req, res, next) => {
  let questions;
  try {
    questions = await Question.find();
  } catch (err) {
    return next(err);
  }

  if (!questions) {
    console.log('There are no questions in the database!');
    return next(err);
  }

  // Potential Bottleneck with large number of questions
  questions.sort((a, b) => a.id - b.id);

  console.log(questions);

  return res.json({ questions });
};

const createQuestion = async (req, res, next) => {
  let { id, title, difficulty, categories, description } = req.body;

  id = parseInt(id);
  if (
    isNaN(id) ||
    !title ||
    title.length === 0 ||
    !description ||
    description.length === 0
  ) {
    return res.status(422).json({
      message:
        'Invalid input, please enter a valid id, title, and description.',
    });
  }

  let questions;
  try {
    questions = await Question.find();
  } catch (err) {
    return next(err);
  }

  const isDuplicate = questions.some((question) => question.id === id);

  if (isDuplicate) {
    return res.status(422).json({
      message: 'Question with the same id already exists.',
    });
  }

  const createdQuestion = new Question({
    id,
    title,
    difficulty: difficulty || '',
    categories: categories || [],
    description,
    question_link: '',
    solution_link: '',
  });

  try {
    await createdQuestion.save();
  } catch (err) {
    console.log('Error creating question: ', err);
    return next(err);
  }

  res.status(201).json({
    message: 'Question added successfully.',
    question: createdQuestion,
  });
};

const deleteQuestion = (req, res, next) => {
  const questionId = parseInt(req.params.questionId);

  let question;
  try {
    question = Question.findOneAndRemove({ id: questionId }).exec();
  } catch (err) {
    console.log('Error finding question: ', err);
    return next(err);
  }

  return res.status(200).json({ message: 'Question deleted.' });
};

const getRandomQuestion = async (req, res, next) => {
  const { difficulty, category } = req.body;
  console.log(difficulty);

  let question;
  try {
    const questions = await Question.find({
      difficulty: difficulty,
      categories: category,
    }).exec();

    console.log(questions);
    question = questions[Math.floor(Math.random() * questions.length)];
  } catch (err) {
    console.log('Error fetching a random question: ', err);
    return next(err);
  }

  return res.status(200).json({ question });
};

exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;
exports.deleteQuestion = deleteQuestion;
exports.getRandomQuestion = getRandomQuestion;
