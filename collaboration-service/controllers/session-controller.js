const WebSocket = require('ws');
const activeSessions = {};
const sessionUsers = {};
let usersInfo = [];
let buttonsState;

const handleConnection = (ws, req) => {
    const sessionId = req.url.substring(1);
    sessionUsers[sessionId] = usersInfo;
    ws.on('message', (message) => {
        const { userId } = JSON.parse(message);
        if (sessionUsers[sessionId] && sessionUsers[sessionId].includes(userId)) {
            ws.send(JSON.stringify({ allowed: true }));
        } else {
            ws.send(JSON.stringify({ allowed: false }));
        }
    });

    if (!activeSessions[sessionId]) {
        activeSessions[sessionId] = {
            left: null,
            right: null,
            listeners: []
        };
    }
    // updateButtonsState(sessionId);
    activeSessions[sessionId].listeners.push(ws);
    activeSessions[sessionId].listeners.forEach(listenerWs => {
        if (listenerWs.readyState === WebSocket.OPEN) {
            listenerWs.send(JSON.stringify({ buttonsState }));
        }
    });
};

const handleMessage = (message, ws, sessionId) => {
    const { type, side } = JSON.parse(message);
    if(type === 'JOIN') {
        if (!activeSessions[sessionId][side]) {
            const index = activeSessions[sessionId].listeners.indexOf(ws);
            if (index > -1) {
                activeSessions[sessionId].listeners.splice(index, 1);
            }
            activeSessions[sessionId][side] = ws;
            updateButtonsState(sessionId);
        } 
    } 

};



const handleClose = (ws, sessionId) => {
    const index = activeSessions[sessionId].listeners.indexOf(ws);
    if (index > -1) {
        activeSessions[sessionId].listeners.splice(index, 1);
    }

    ['left', 'right'].forEach(side => {
        if (activeSessions[sessionId][side] === ws) {
            activeSessions[sessionId][side] = null;
        }
    });
};

const updateButtonsState = (sessionId) => {
    buttonsState = {
        left: activeSessions[sessionId].left === null,
        right: activeSessions[sessionId].right === null
    };

    ['left', 'right'].forEach(side => {
        const userWs = activeSessions[sessionId][side];
        if (userWs && userWs.readyState === WebSocket.OPEN) {
            userWs.send(JSON.stringify({ buttonsState }));
        }
    });

    // Send to general listener accessed via sessionId
    activeSessions[sessionId].listeners.forEach(listenerWs => {
        if (listenerWs.readyState === WebSocket.OPEN) {
            listenerWs.send(JSON.stringify({ buttonsState }));
        }
    });
};

const handleKafkaMessage = (message, wss) => {
    // Handle the Kafka message here.
    // You can send it to a specific WebSocket client or broadcast it as needed.
    
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