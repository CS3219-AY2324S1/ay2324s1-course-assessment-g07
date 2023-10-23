const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  categories: { type: Array, required: true },
  description: { type: String, required: true },
  question_link: { type: String, required: false },
  solution_link: { type: String, required: false },
});

module.exports = mongoose.model('questions', QuestionSchema);
