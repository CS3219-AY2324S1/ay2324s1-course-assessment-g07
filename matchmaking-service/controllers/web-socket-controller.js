
const WebSocket = require('ws');
const eventEmitter = require('./event-controller');
const sendMessage = require('./kafka-producer-controller');
const matchmakingController = require('./matchmaking-controller');
const sendSessionInformation = require('./kafka-producer-controller');


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
                            setUserInfo(ws, parsedMessage);                            
                            break;

                        case 'searchForTeam':
                            handleStartSearch(ws, parsedMessage);
                            break;

                        case 'removeMeFromQueue':
                            handleCancelSearch(ws, parsedMessage);
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

const setUserInfo = (ws, parsedMessage) => {
    ws.username = parsedMessage.data.username;
    ws.userId = parsedMessage.data.userId;
    console.log(`set up user ${ws.username} with userid ${ws.userId}`);
    socketMap[ws.userId] = ws;
}

const handleStartSearch = (ws, parsedMessage) => {
    const searchComplexity = parsedMessage.questionComplexity;
    ws.searchComplexity = parsedMessage.questionComplexity;
    ws.searchType = parsedMessage.questionType;
    ws.startTime = new Date();

    const searchRequest = {
        questionComplexity: parsedMessage.questionComplexity,
        userId: ws.userId,
        questionType: parsedMessage.questionType,
        action: 'add'
    };
    ws.searchParams = `${searchRequest.questionComplexity}_${searchRequest.questionType}`;

    matchmakingController.send(JSON.stringify(searchRequest))
        .catch((error) => {
            console.log("error connecting to amqp:", error);    
        })
    console.log("avg waiting time", getWaitingTime(ws.searchParams));
    const response = {type: 'averageWaitingTime', data:  getWaitingTime(ws.searchParams)};
    ws.send(JSON.stringify(response));
}

const handleCancelSearch = (ws, parsedMessage) => {                        
    const removeRequest = {
        questionComplexity: parsedMessage.questionComplexity,
        userId: ws.userId,
        questionType: parsedMessage.questionType,
        action: 'delete'
    };
    pushWaitingTime(ws);
    matchmakingController.send(JSON.stringify(removeRequest))
        .catch((error) => {
            console.log("error connecting to amqp:", error);    
        })
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
        
        pushWaitingTime(socket1);
        pushWaitingTime(socket2);

        const complexity = socket1.searchComplexity == "Any" ? socket2.searchComplexity : socket1.searchComplexity;
        const type = socket1.searchType == "Any" ? socket2.searchType : socket1.searchType;
        
        //  send the newly created session to kafka and other mircoservices
        sendSessionInformation(sessionId, user1, user2, complexity, type);
    }

}

const generateSessionId = () => {
    const timestamp = new Date().getTime(); 
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}

const pushWaitingTime = (user) => {
    const searchParams = user.searchParams;

    if (!(searchParams in waitingTimes)) {
        waitingTimes[searchParams] = [];
    }

    waitingTimes[searchParams].push(new Date() - user.startTime);
    console.log("pushed times", new Date() - user.startTime);
    
    while (waitingTimes[searchParams].length > NUM_TAKEN_FOR_AVG) waitingTimes[searchParams].shift();

}

const getWaitingTime = (searchParams) => {
    if (!(searchParams in waitingTimes)) return 0;

    return waitingTimes[searchParams].reduce((total, value) => total + value, 0) / waitingTimes[searchParams].length / 1000;
}
module.exports = {
    createWebSocket: createWebSocket,
    handleSuccessfulMatch: handleSuccessfulMatch
};



