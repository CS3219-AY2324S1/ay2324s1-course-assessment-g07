const History = require('../models/history');


const addHistory = async (req, res) => {
    const { userId, questionId, win, attemptDate } = req.body;

    if (!userId || !questionId || win == undefined) {
        return res.status(422).json({
        message:
            `Invalid input, please enter a valid user id ${userId}, question id${questionId}, and result${win}`,
        });
    }

    try {
        const historyEntry = new History({ userId, questionId, win, attemptDate });
        await historyEntry.save();
        res.status(201).json({ message: 'History entry added successfully.' });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error}` });
    }
};
    
const getHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const userHistory = await History.find({ userId });
        res.status(200).json(userHistory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getHistory: getHistory,
    addHistory: addHistory
}
