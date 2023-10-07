
const WebSocket = require('ws');
const eventEmitter = require('./event-controller');
const matchmakingController = require('./matchmaking-controller');


const socketMap = {};
const waitingTimes = {};
const NUM_TAKEN_FOR_AVG = 20;

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
                            ws.startTime = new Date();
                            console.log(ws.startTime);
                            const searchRequest = {
                                question_complexity: searchComplexity,
                                userId: ws.userId,
                                question_type: 'placeholder-type',
                                action: 'add'
                            };
                            ws.searchParams = `${searchRequest.searchComplexity}_${searchRequest.type}`;

                            matchmakingController.send(JSON.stringify(searchRequest))
                                .catch((error) => {
                                    console.log("error connecting to amqp:", error);    
                                })
                            console.log("avg waiting time", getWaitingTime(ws.searchParams));
                            const response = {type: 'averageWaitingTime', data:  getWaitingTime(ws.searchParams)};
                            ws.send(JSON.stringify(response));
                            break;

                        case 'removeMeFromQueue':
                            
                            const removeRequest = {
                                question_complexity: parsedMessage.complexity,
                                userId: ws.userId,
                                question_type: 'placeholder-type',
                                action: 'delete'
                            };

                            matchmakingController.send(JSON.stringify(removeRequest))
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
        socket1.send('matched'); 
        socket2.send('matched'); 
        
        socket1.send(JSON.stringify({ type: 'sessionId', data: sessionId }));
        socket2.send(JSON.stringify({ type: 'sessionId', data: sessionId }));   
        
        pushWaitingTime(socket1, socket2);
    }

}

const generateSessionId = () => {
    const timestamp = new Date().getTime(); 
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}

const pushWaitingTime = (user1, user2) => {
    const searchParams = user1.searchParams;

    if (!(searchParams in waitingTimes)) {
        waitingTimes[searchParams] = [];
    }

    waitingTimes[searchParams].push(new Date() - user1.startTime);
    waitingTimes[searchParams].push(new Date() - user2.startTime);
    console.log("pushed times", new Date() - user1.startTime);
    
    while (waitingTimes[searchParams].length > NUM_TAKEN_FOR_AVG) waitingTimes.shift();

}

const getWaitingTime = (searchParams) => {
    if (!(searchParams in waitingTimes)) return 0;

    return waitingTimes[searchParams].reduce((total, value) => total + value, 0) / waitingTimes[searchParams].length / 1000;
}
module.exports = {
    createWebSocket: createWebSocket,
    handleSuccessfulMatch: handleSuccessfulMatch
};



