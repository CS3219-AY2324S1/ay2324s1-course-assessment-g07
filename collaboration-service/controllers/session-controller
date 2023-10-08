const WebSocket = require('ws');
const activeSessions = {};
const sessionUsers = {};

const handleConnection = (ws, req) => {
    const sessionId = req.url.substring(1);
    ws.on('message', (message) => {
        const { userId } = JSON.parse(message);
        sessionUsers[sessionId] = ['1f727a8c-63b5-4835-aa58-6fd69e0af1dd', 'ded9aae3-a320-4406-a7cb-630021faaaf9'];
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

    activeSessions[sessionId].listeners.push(ws);
};

const handleMessage = (message, ws, sessionId) => {
    const { type, side } = JSON.parse(message);
    
    if (!activeSessions[sessionId][side]) {
        const index = activeSessions[sessionId].listeners.indexOf(ws);
        if (index > -1) {
            activeSessions[sessionId].listeners.splice(index, 1);
        }
        activeSessions[sessionId][side] = ws;
        updateButtonsState(sessionId);
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
    updateButtonsState(sessionId);
};

const updateButtonsState = (sessionId) => {
    const buttonsState = {
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

module.exports = {
    handleConnection,
    handleMessage,
    handleClose,
    updateButtonsState,
};