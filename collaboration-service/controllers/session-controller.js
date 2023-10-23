const WebSocket = require('ws');
const activeSessions = {};
let usersInfo = [];
let randomQuestion;
const sessionUsers = {};
const randomQuestions = {};

const axios = require('axios');

const expirationTime = 300000; // 5 minutes in milliseconds
const handleConnection = (ws, req) => {
    const sessionId = req.url.substring(1);
    sessionUsers[sessionId] = usersInfo;
    randomQuestions[sessionId] = randomQuestion
    ws.on('message', (message) => {
        const { userId } = JSON.parse(message);
        ws.userId = userId; 
        if (sessionUsers[sessionId] && sessionUsers[sessionId].includes(userId)) {
            ws.send(JSON.stringify({ allowed: true, usersInfo: usersInfo }));
        } else {
            ws.send(JSON.stringify({ allowed: false }));
        }
        
        if (userId === activeSessions[sessionId].left) {
            ws.send(JSON.stringify({ sideJoined: 'left' }));
            if (activeSessions[sessionId].leftTimer) {
                clearTimeout(activeSessions[sessionId].leftTimer);
                delete activeSessions[sessionId].leftTimer;
                console.log(`Timer cleared for left user ${userId}`);
            }
        } else if (userId === activeSessions[sessionId].right) {
            ws.send(JSON.stringify({ sideJoined: 'right' }));
            if (activeSessions[sessionId].rightTimer) {
                clearTimeout(activeSessions[sessionId].rightTimer);
                delete activeSessions[sessionId].rightTimer;
                console.log(`Timer cleared for right user ${userId}`);
            }
        }
    });

    if (!activeSessions[sessionId]) {
        activeSessions[sessionId] = {
            left: null,
            right: null,
            listeners: [],
            buttonsState: {
                left: true, 
                right: true 
            }
        };
    }

    activeSessions[sessionId].listeners.push(ws);

    activeSessions[sessionId].listeners.forEach(listenerWs => {
        if (listenerWs.readyState === WebSocket.OPEN) {
            listenerWs.send(JSON.stringify(randomQuestions[sessionId]));
            listenerWs.send(JSON.stringify({ buttonsState: activeSessions[sessionId].buttonsState }));
        }
    });
};

const handleMessage = (message, ws, sessionId) => {
    const { type, side, userId } = JSON.parse(message);
    if(type === 'JOIN') {
        if (!activeSessions[sessionId][side]) {
            const index = activeSessions[sessionId].listeners.indexOf(ws);
            if (index > -1) {
                activeSessions[sessionId].listeners.splice(index, 1);
            }
            activeSessions[sessionId][side] = userId;
            updateButtonsState(sessionId);
        } 

        if (side === 'left' && activeSessions[sessionId].leftTimer) {
            clearTimeout(activeSessions[sessionId].leftTimer);
            delete activeSessions[sessionId].leftTimer;
        } else if (side === 'right' && activeSessions[sessionId].rightTimer) {
            clearTimeout(activeSessions[sessionId].rightTimer);
            delete activeSessions[sessionId].rightTimer;
        }
    } 

};


const handleClose = (ws, sessionId) => {
    const index = activeSessions[sessionId].listeners.indexOf(ws);
    if (index > -1) {
        activeSessions[sessionId].listeners.splice(index, 1);
    }

    if (activeSessions[sessionId].left === ws.userId) {
        // Start expiration timer for left user
        console.log(`Starting expiration timer for left user ${ws.userId}`);
        activeSessions[sessionId].leftTimer = setTimeout(() => {
            console.log(`Expiration timer ended for left user ${ws.userId}` + expirationTime);
            activeSessions[sessionId].left = null;
            updateButtonsState(sessionId);

            const userIndex = sessionUsers[sessionId].indexOf(ws.userId);
            if (userIndex > -1) {
                console.log(`${ws.userId} no longer in session`);
                usersInfo.splice(userIndex, 1);
            }

        }, expirationTime);
    } else if (activeSessions[sessionId].right === ws.userId) {
        // Start expiration timer for right user
        activeSessions[sessionId].rightTimer = setTimeout(() => {
            activeSessions[sessionId].right = null;
            updateButtonsState(sessionId);

            const userIndex = sessionUsers[sessionId].indexOf(ws.userId);
            if (userIndex > -1) {
                console.log(`${ws.userId} no longer in session`);
                usersInfo.splice(userIndex, 1);
            }
            
        }, expirationTime);
    }

    if (activeSessions[sessionId].listeners.length === 0 && activeSessions[sessionId].left === null && activeSessions[sessionId].right === null) {
        console.log(`Deleting session ${sessionId}`);
        delete activeSessions[sessionId];
        delete sessionUsers[sessionId];
    }

};

const updateButtonsState = (sessionId) => {
    activeSessions[sessionId].buttonsState = {
        left: activeSessions[sessionId].left === null,
        right: activeSessions[sessionId].right === null
    };

    // Send to general listener accessed via sessionId
    activeSessions[sessionId].listeners.forEach(listenerWs => {
        if (listenerWs.readyState === WebSocket.OPEN) {
            listenerWs.send(JSON.stringify({ buttonsState: activeSessions[sessionId].buttonsState }));
        }
    });
};

const handleKafkaMessage = async (message, wss) => {
    
    const {user1, user2, questionComplexity, questionType } = JSON.parse(message);

    if (!sessionUsers) {
        console.log('test');
    }

    else {
        usersInfo = [user1, user2];
    }

    try {
        // Fetch random question from API
        const response = await axios.get('http://localhost:8001/questions/randomQuestion', {

            data: {
               "difficulty": questionComplexity,
                "category": questionType
            }
        });

        randomQuestion = response.data;
        console.log(randomQuestion);

    } catch (error) {
        console.error('Error fetching the random question from API:', error);
    }

    // For example, to broadcast the message to all connected clients:
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

module.exports = {
    handleConnection,
    handleMessage,
    handleClose,
    updateButtonsState,
    handleKafkaMessage,
};