const WebSocket = require('ws');

const complexityMap = {'Easy':0, 'Medium':1, 'Hard':2, 'Any':3}
const waitingQueue = [[],[],[],[]];
const waitingTimeQueue = [[],[],[],[]];
const maxWaitingTimeQueueSize = 20;
const activeSessions = {};

const createWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server }); 

    wss.on('connection', (ws) => {
        console.log('WebSocket connection established.');
    
        // Handle incoming WebSocket messages
        ws.on('message', (message) => {
            console.log(`Received WebSocket message: ${message}`);
            try {
                const parsedMessage = JSON.parse(message);
        
                if (typeof parsedMessage === 'object') {
                    switch (parsedMessage.type) {
                        case 'searchForTeam':
                        const searchComplexity = parsedMessage.complexity;
                        waitingQueue[complexityMap[searchComplexity]].push(gererateQueueEntry(ws)); // Add the WebSocket to the waiting queue
                        console.log('Added to the matchmaking queue ',searchComplexity,' ', waitingQueue[complexityMap[searchComplexity]].length);
                        console.log("avg waiting time", getAverageWaitingTime(searchComplexity));
                        const response = {type: 'averageWaitingTime', data: getAverageWaitingTime(searchComplexity)};
                        ws.send(JSON.stringify(response));
            
                        tryMatchmaking(searchComplexity); // Attempt to match users when someone joins the queue
                        break;
            
                        case 'removeMeFromQueue':
                        removeFromQueue(ws, parsedMessage.complexity);
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
                console.log("received text msg");
                handleTextMessage(message.toString('utf8'));
            }
    
        });
    
        // Handle WebSocket disconnection
        ws.on('close', () => {
        console.log('WebSocket connection closed.');
        // removeFromQueue(ws); // Remove the WebSocket from the queue when disconnected
        });
    });
    
    return wss;
}

const gererateQueueEntry = (ws) => {
    const joinedTime = Date.now();
    return {ws, joinedTime};
}

const pushWaitingTime = (joinedTime, complexity) => {
    const waitingTime = (Date.now() - joinedTime) / 1000;
    waitingTimeQueue[complexityMap[complexity]].push(waitingTime);
    
    if (waitingTimeQueue[complexityMap[complexity]].length > maxWaitingTimeQueueSize) {
        waitingTimeQueue.shift();
    } 
}

const getAverageWaitingTime = (complexity) => {
    const sum = waitingTimeQueue[complexityMap[complexity]].reduce((sum, next) => sum + next, 0);
    const l = waitingTimeQueue[complexityMap[complexity]].length;
    return sum / l;
}

const removeFromQueue = (ws, complexity) => {
    try {
        const index = waitingQueue[complexityMap[complexity]].findIndex(user => user.ws === ws);;
        if (index !== -1) {
            const joinedTime = waitingQueue[complexityMap[complexity]][index].joinedTime;
            pushWaitingTime(joinedTime, complexity);
            waitingQueue[complexityMap[complexity]].splice(index, 1);
            console.log('Removed from the matchmaking queue.');
        }
    } catch(err) {
        console.log("error removing from queue ", complexity, 'with error ', err );
    }
    
}

const findNonEmptyQueue = () => {
    for (const complexity in complexityMap) {
        if (complexity != 'Any' && waitingQueue[complexityMap[complexity]] && waitingQueue[complexityMap[complexity]].length > 0) {
            return complexity; 
        }
    }
    return null; 
}

const tryMatchmaking = ( complexity ) => {
    const targetQueueLength = waitingQueue[complexityMap[complexity]].length;
    const anyQueueLength = waitingQueue[complexityMap['Any']].length;
    console.log('length of any queue:', anyQueueLength, ' length of target queue:', targetQueueLength);
    
    if (targetQueueLength >= 2) {
        const tuple1 = waitingQueue[complexityMap[complexity]].shift();
        const tuple2 = waitingQueue[complexityMap[complexity]].shift();

        const user1 = tuple1.ws;
        const user2 = tuple2.ws;

        const joinedTime1 = tuple1.joinedTime;
        const joinedTime2 = tuple2.joinedTime;

        pushWaitingTime(joinedTime1, complexity);
        pushWaitingTime(joinedTime2, complexity);

        removeFromQueue(user1, complexity);
        removeFromQueue(user2, complexity);

        createAndJoinSession(user1, user2);
    } else if (complexity != 'Any' && targetQueueLength === 1 && anyQueueLength >= 1) {
        // Match a user from the specific queue with a user from the 'Any' queue
        const tuple1 = waitingQueue[complexityMap[complexity]].shift();
        const tuple2 = waitingQueue[complexityMap['Any']].shift();
        const user1 = tuple1.ws;
        const user2 = tuple2.ws;
        const joinedTime1 = tuple1.joinedTime;
        const joinedTime2 = tuple2.joinedTime;

        pushWaitingTime(joinedTime1, complexity);
        pushWaitingTime(joinedTime2, 'Any');

        removeFromQueue(user1, complexity);
        removeFromQueue(user2, 'Any');

        createAndJoinSession(user1, user2);
    } else if (complexity == 'Any' && anyQueueLength == 1 && findNonEmptyQueue()!=null) {
        const targetComplexity = findNonEmptyQueue();
        const tuple1 = waitingQueue[complexityMap[targetComplexity]].shift();
        const tuple2 = waitingQueue[complexityMap['Any']].shift();
        const user1 = tuple1.ws;
        const user2 = tuple2.ws;
        const joinedTime1 = tuple1.joinedTime;
        const joinedTime2 = tuple2.joinedTime;

        pushWaitingTime(joinedTime1, targetComplexity);
        pushWaitingTime(joinedTime2, 'Any');

        removeFromQueue(user1, targetComplexity);
        removeFromQueue(user2, 'Any');

        createAndJoinSession(user1, user2);  
    }
}

const generateSessionId = () => {
    const timestamp = new Date().getTime(); 
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}

const createAndJoinSession = (user1, user2) => {
    user1.send('matched'); // Send a message to user1
    user2.send('matched'); // Send a message to user2
    const sessionId = generateSessionId(); 

    const session = {
    id: sessionId,
    users: [user1, user2],
    };

    activeSessions[sessionId] = session;

    // Send session information to matched users
    user1.send(JSON.stringify({ type: 'sessionId', data: sessionId }));
    user2.send(JSON.stringify({ type: 'sessionId', data: sessionId }));
}

module.exports = createWebSocketServer;