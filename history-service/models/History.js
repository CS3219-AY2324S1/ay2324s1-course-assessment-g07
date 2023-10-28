const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  questionId: { type: Number, required: true },
  raceOutcome: { type: Number, required: true },//012
  score: { type: Number, required: true },
  attemptDate: { type: Date, default: Date.now, required: true },
  submission: { type: String, required: false },
  feedback: { type: String, required: true },
  language: { type: String, required: true }
});

module.exports = mongoose.model('history', HistorySchema);