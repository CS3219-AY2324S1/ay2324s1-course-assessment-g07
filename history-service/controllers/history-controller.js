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
        const userId  = req.query.userId;
        console.log(userId)
        const userHistory = await History.find({userId: userId});
        res.status(200).json(userHistory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserIds = async () => {
    const res = await fetch("http://localhost:8000/users/getUser", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })


    const response = await res.json();
    console.log("successfully get all user ids");
    return response;

}



const getLeaders = async (req, res) => {
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    const week = new Date(now.getTime() - 7 * oneDay);
    const month = new Date(now.getTime() - 30 * oneDay);
    const day = new Date(now.getTime() - oneDay);
    console.log(week.toDateString())
    console.log(week.toISOString())
    console.log(week.toISOString() <= '2023-10-24T12:00:00.000+00:00')
    const groups ={
        $group: {
        _id: "$userId",
        totalWins: {
            $sum: {
            $cond: [{ $eq: ['$raceOutcome', 1] }, 1, 0]
            }
        },
        totalGames: { $sum: 1 }
        }
    };

    const pastDay = {
        $match: { attemptDate: { $gte: day }}
    };
    
    const pastWeek = {
        $match: { attemptDate: { $gte: week }}
    };
    
    const pastMonth = {
        $match: { attemptDate: { $gte: month }}
    };


    const addWinRate = {
        $addFields: { winRate: { $divide: ['$totalWins', '$totalGames'] }}
    };

    const sort = { $sort: { totalWins: -1, winRate: -1 }};

    try {
        const userIds = await getUserIds();

        const weekUsersRankings = await History.aggregate([
            pastWeek,
            groups,
            addWinRate,
            sort
        ]);

        const monthUsersRankings = await History.aggregate([
            pastMonth,
            groups,
            addWinRate,
            sort
        ]);
        
        const dayUsersRankings = await History.aggregate([
            pastDay,
            groups,
            addWinRate,
            sort
        ]);

        // console.log(weekUsersRankings);
    
        res.status(200).json({
            'week': weekUsersRankings,
            'month': monthUsersRankings,
            'day': dayUsersRankings
        });       
    } catch (error) {
        console.log(error);
        res.status(500).json(({error: "internal server error"}));
    }
}

module.exports = {
    getHistory: getHistory,
    addHistory: addHistory,
    getLeaders: getLeaders
}
