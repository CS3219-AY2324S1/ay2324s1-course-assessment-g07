const WebSocket = require('ws');
const activeSessions = {};
const sessionUsers = {};
let usersInfo = [];

const expirationTime = 300000; // 5 minutes in milliseconds
const handleConnection = (ws, req) => {
    const sessionId = req.url.substring(1);
    sessionUsers[sessionId] = usersInfo;
    ws.on('message', (message) => {
        const { userId } = JSON.parse(message);
        if (sessionUsers[sessionId] && sessionUsers[sessionId].includes(userId)) {
            ws.send(JSON.stringify({ allowed: true, usersInfo: usersInfo }));
        } else {
            ws.send(JSON.stringify({ allowed: false }));
        }
        if (activeSessions[sessionId].left) {
            if(userId === activeSessions[sessionId].left){
               ws.send(JSON.stringify({ sideJoined: 'left' }));
            }
        }
    
        if (activeSessions[sessionId].right) {
            if(userId === activeSessions[sessionId].right){
               ws.send(JSON.stringify({ sideJoined: 'right' }));
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
        activeSessions[sessionId].leftTimer = setTimeout(() => {
            activeSessions[sessionId].left = null;
            updateButtonsState(sessionId);

            const userIndex = sessionUsers[sessionId].indexOf(ws.userId);
            if (userIndex > -1) {
                sessionUsers[sessionId].splice(userIndex, 1);
            }

        }, expirationTime);
    } else if (activeSessions[sessionId].right === ws.userId) {
        // Start expiration timer for right user
        activeSessions[sessionId].rightTimer = setTimeout(() => {
            activeSessions[sessionId].right = null;
            updateButtonsState(sessionId);

            const userIndex = sessionUsers[sessionId].indexOf(ws.userId);
            if (userIndex > -1) {
                sessionUsers[sessionId].splice(userIndex, 1);
            }
            
        }, expirationTime);
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

const handleKafkaMessage = (message, wss) => {
    
    const {user1, user2, questionComplexity, questionType } = JSON.parse(message);

    // Check if this session already exists in sessionUsers
    if (!sessionUsers) {
        console.log(test);
    }

    else {
        usersInfo = [user1, user2];
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