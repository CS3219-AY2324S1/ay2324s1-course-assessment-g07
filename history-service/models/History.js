const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: { type: String, required: true },
  questionId: { type: Number, required: true },
  win: { type: Boolean, required: true },
  attemptDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('History', HistorySchema);