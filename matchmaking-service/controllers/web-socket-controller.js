
const WebSocket = require('ws');
const eventEmitter = require('./event-controller');
const matchmakingController = require('./matchmaking-controller');


const socketMap = {};
const createWebSocket = (server) => { 
    const wss = new WebSocket.Server({ server }); 

    wss.on('connection', (ws) => {
    console.log('WebSocket connection established by server.');

    ws.on('message', (message) => {
        console.log(`Received WebSocket message: ${message}`);
        try {
        const parsedMessage = JSON.parse(message);

        if (typeof parsedMessage === 'object') {
            switch (parsedMessage.type) {
                case 'setUserInfo':
                    ws.username = parsedMessage.data.username;
                    ws.userId = parsedMessage.data.userId;
                    console.log(`set up user ${ws.username} with userid ${ws.userId}`);
                    socketMap[ws.userId] = ws;
                    
                    break;

                case 'searchForTeam':
                    const searchComplexity = parsedMessage.complexity;
                    ws.searchComplexity = searchComplexity;
                    const searchRequest = {
                        complexity: searchComplexity,
                        userId: ws.userId,
                        type: 'placeholder-type',
                        action: 'add'
                    };

                    matchmakingController.send(JSON.stringify(searchRequest))
                    // .then(() => {
                    //     console.log("sent request to amqp");
                    // })
                    .catch((error) => {
                        console.log("error connecting to amqp:", error);    
                    })
                    // waitingQueue[complexityMap[searchComplexity]].push(gererateQueueEntry(ws)); // Add the WebSocket to the waiting queue
                    // console.log('Added to the matchmaking queue ', searchComplexity);
                    // console.log('current queue size for complexity ', searchComplexity, ' :', waitingQueue[complexityMap[searchComplexity]].length);

                    // console.log("avg waiting time", getAverageWaitingTime(searchComplexity));
                    // const response = {type: 'averageWaitingTime', data: getAverageWaitingTime(searchComplexity)};
                    // ws.send(JSON.stringify(response));
        
                    // tryMatchmaking(searchComplexity); // Attempt to match users when someone joins the queue

                    // const message = { type: 'searchForTeam', userId: ws.userId, complexity: searchComplexity };
                    // client.send(destination, {}, JSON.stringify(message));
                    break;

                case 'removeMeFromQueue':
                    const removeRequest = {
                        complexity: parsedMessage.complexity,
                        userId: ws.userId,
                        type: 'placeholder-type',
                        action: 'delete'
                    };

                    matchmakingController.send(JSON.stringify(removeRequest))
                        // .then(() => {
                        // console.log("sent delete request to amqp");
                        // })
                        .catch((error) => {
                        console.log("error connecting to amqp:", error);    
                        })
                    break;

                case 'disconnect':
                    delete socketMap[ws.userId];
                    break;

                default:
                    console.log('Unknown message type:', parsedMessage.type);
                    break;
            }
        } else {
            handleTextMessage(message.toString('utf8'));
        }
        } catch (error) {
            console.log(error)
            console.log("received unknown text msg");
        }

    });

    });
    return wss;
}

eventEmitter.on('matchFound', ({ userId1, userId2 }) => {
    console.log(`emitter rec: ${userId1} ${userId2}`)
    handleSuccessfulMatch(userId1, userId2);
});

const handleSuccessfulMatch = (user1, user2) => {
    if (!(user1 in socketMap)) {
        console.log(`${user1} not in socketmap`);
    } else if (!(user2 in socketMap)) {
        console.log(`${user2} not in socketmap`);
    } else {
        socket1 = socketMap[user1];
        socket2 = socketMap[user2];
        const sessionId = generateSessionId();
        socket1.send('matched'); // Send a message to user1
        socket2.send('matched'); // Send a message to user2
        
        socket1.send(JSON.stringify({ type: 'sessionId', data: sessionId }));
        socket2.send(JSON.stringify({ type: 'sessionId', data: sessionId }));       
    }

}

const generateSessionId = () => {
    const timestamp = new Date().getTime(); 
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}

module.exports = {
    createWebSocket: createWebSocket,
    handleSuccessfulMatch: handleSuccessfulMatch
};



