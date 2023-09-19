const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array, required: true },
  complexity: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model('questions', QuestionSchema);
