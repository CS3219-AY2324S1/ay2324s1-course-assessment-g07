const History = require('../models/History');


const addHistory = async (req, res) => {
    const { userId, sessionId, questionId, raceOutcome, score, attemptDate, submission, feedback, difficulty } = req.body;

    if (!userId || !questionId || !sessionId || raceOutcome == undefined) {
        return res.status(422).json({
        message:
            `Invalid input, please enter a valid user id ${userId}, question id${questionId}, sessionId, and result`,
        });
    }

    try {
        // const historyEntry = new History({ userId, sessionId, questionId, raceOutcome, score, attemptDate, submission, feedback, difficulty });
        // await historyEntry.save();
        // res.status(201).json({ message: 'History entry added successfully.' });
        const existingRecord = await History.findOne({ sessionId });

        if (existingRecord) {
            // If exists, update the raceOutcome of the existing record
            const outcomeForExistingRecord = existingRecord.score == score ? 0
                                            : existingRecord.score > score ? 1 : 2;
            const outcomeForNewRecord = existingRecord.score == score ? 0
                                            : existingRecord.score > score ? 2 : 1;
            await History.updateOne({ sessionId }, { $set: { outcomeForExistingRecord } });
            const historyEntry = new History({ userId, sessionId, questionId, outcomeForNewRecord, score, attemptDate, submission, feedback, difficulty });
            await historyEntry.save();
            res.status(200).json({ message: 'History entry updated successfully.' });
        } else {
            // If not, add a new history entry
            const historyEntry = new History({ userId, sessionId, questionId, raceOutcome, score, attemptDate, submission, feedback, difficulty });
            await historyEntry.save();
            res.status(201).json({ message: 'History entry added successfully.' });
        }
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error}` });
    }
};
    
const getHistory = async (req, res) => {
    try {
        const userId  = req.query.userId;
        const match = { $match: { userId: userId }};
        const sort = { $sort: { attemptDate: -1 }};
        
        const userHistory = await History.aggregate([match, sort]);
        console.log(userHistory)
        res.status(200).json(userHistory);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserNames = async (rankings) => {
    // console.log(rankings);
    const userPromises = rankings.map(async (user) => {
        try {
            const res = await fetch(`http://localhost:8000/users/getUser?userId=${user._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (res.ok) {
                const userData = await res.json();
                // console.log(userData);
                return {
                    ...user,
                    userName: userData.user.username
                };
            } else {
                console.log(`Failed to fetch user data for user ID: ${user._id}`);
                return {
                    ...user,
                    userName: "Cannot find username"
                };
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return user;
        }
    });
    
    const usersWithNames = await Promise.all(userPromises);

    return usersWithNames;
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

    const limit = { $limit: 5 };

    try {
        const weekUsersRankings = await getUserNames(await History.aggregate([
            pastWeek,
            groups,
            addWinRate,
            sort,
            limit
        ]));

        const monthUsersRankings = await getUserNames(await History.aggregate([
            pastMonth,
            groups,
            addWinRate,
            sort,
            limit
        ]));
        
        const dayUsersRankings = await getUserNames(await History.aggregate([
            pastDay,
            groups,
            addWinRate,
            sort,
            limit
        ]));



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
