const History = require('../models/history');


const addHistory = async (req, res) => {
    const { userId, sessionId, questionId, raceOutcome, score, attemptDate, submission, feedback } = req.body;

    if (!userId || !questionId || !sessionId || raceOutcome == undefined) {
        return res.status(422).json({
        message:
            `Invalid input, please enter a valid user id ${userId}, question id${questionId}, sessionId, and result`,
        });
    }

    try {
        const historyEntry = new History({ userId, sessionId, questionId, raceOutcome, score, attemptDate, submission, feedback });
        await historyEntry.save();
        res.status(201).json({ message: 'History entry added successfully.' });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error}` });
    }
};
    
const getHistory = async (req, res) => {

    try {
        const { userId } = req.params;
        console.log(userId)
        const userHistory = await History.find();
        console.log(userHistory)
        res.status(200).json(userHistory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLeaders = async (req, res) => {
    const day = 1000 * 3600 * 24;
    const week = day * 7;
    const month = day * 30;
    const groups = {
        $group: {
        _id: '$userId',
        totalWins: {
            $sum: {
            $cond: [{ $eq: ['$raceOutcome', 1] }, 1, 0]
            }
        },
        totalGames: { $sum: 1 }
        }
    };

    const pastWeek = {
        $match: {
          attemptedDate: {
            $gte: new Date(new Date() - week) // Within the last 1 week
          }
        }
      };

    try {
        const weekUsersRankings = await History.aggregate([
            pastWeek,
            groups,
            { $sort: { totalWins: -1 }}
        ]);
    
        res.json(weekUsersRankings);       
    } catch (error) {
        console.log(error);
        res.staus(500).json(({error: "internal server error"}));
    }
}

module.exports = {
    getHistory: getHistory,
    addHistory: addHistory,
    getLeaders: getLeaders
}
