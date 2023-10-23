const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  questionId: { type: Number, required: true },
  win: { type: Boolean, required: true },//012
  score: { type: Number, required: true },
  attemptDate: { type: Date, default: Date.now, required: true },
  code: { type: String, required: true },
  feedback: { type: String, reuqired: true}
});

module.exports = mongoose.model('History', HistorySchema);