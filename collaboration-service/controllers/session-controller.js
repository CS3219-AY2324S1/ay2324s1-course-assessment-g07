const WebSocket = require('ws');
const activeSessions = {};
let usersInfo = [];
let randomQuestion;
const sessionUsers = {};
const randomQuestions = {};

const axios = require('axios');

const expirationTime = 1800000; // 5 minutes in milliseconds
const disconnectTime = 15000;

const handleConnection = (ws, req) => {
    //need to handle user not connecting, user not responding.
    const sessionId = req.url.substring(1);
    sessionUsers[sessionId] = usersInfo;
    randomQuestions[sessionId] = randomQuestion
    ws.on('message', (message) => {
        const { userId } = JSON.parse(message);
        ws.userId = userId;
        if (sessionUsers[sessionId] && sessionUsers[sessionId].includes(userId)) {
            ws.send(JSON.stringify({ allowed: true, usersInfo: usersInfo }));
            if (!activeSessions[sessionId].first) {
                activeSessions[sessionId].first = ws.userId;
                console.log(`User ${ws.userId} assigned as first`);
            } else if (activeSessions[sessionId].first !== ws.userId && !activeSessions[sessionId].second) {
                activeSessions[sessionId].second = ws.userId;
                console.log(`User ${ws.userId} assigned as second`);
            }
        } else {
            ws.send(JSON.stringify({ allowed: false }));
        }

        //expiration
        if (userId === activeSessions[sessionId].first) {
            if (activeSessions[sessionId].firstTimer) {
                clearTimeout(activeSessions[sessionId].firstTimer);
                delete activeSessions[sessionId].firstTimer;
            }
        } else if (userId === activeSessions[sessionId].second) {
            if (activeSessions[sessionId].secondTimer) {
                clearTimeout(activeSessions[sessionId].secondTimer);
                delete activeSessions[sessionId].secondTimer;
            }
        }
    });

    if (!activeSessions[sessionId]) {
        activeSessions[sessionId] = {
            first: null,
            second: null,
            listeners: [],
        };
    }

    activeSessions[sessionId].listeners.push(ws);

    activeSessions[sessionId].listeners.forEach(listenerWs => {
        if (listenerWs.readyState === WebSocket.OPEN) {
            listenerWs.send(JSON.stringify(randomQuestions[sessionId]));
        }
    });
};

const handleMessage = (message, ws, sessionId) => {
    const { type, userId, confirmEnd } = JSON.parse(message);
    const session = activeSessions[sessionId];

    if (type === 'REQUEST_END_SESSION') {
        if (confirmEnd) {
            // Both users agreed to end the session
            session.listeners.forEach(listenerWs => {
                if (listenerWs.readyState === WebSocket.OPEN) {
                    listenerWs.send(JSON.stringify({ type: 'END_SESSION' }));
                }
            });
            handleClose(ws, sessionId, confirmEnd);

        } else {
            const otherUser = userId === session.first ? 'second' : 'first';
            const otherUserId = session[otherUser];
            session.listeners.forEach(listenerWs => {
                if (listenerWs.userId === otherUserId && listenerWs.readyState === WebSocket.OPEN) {
                    listenerWs.send(JSON.stringify({ type: 'requestEndSession' }));
                }
            });
            console.log(`userId: ${userId}, otherUser: ${otherUser}, otherUserId: ${otherUserId}`);
        }

    };
}


const handleClose = (ws, sessionId, confirmEnd) => {
    
    let index;
    if(activeSessions[sessionId]) {    
        index = activeSessions[sessionId].listeners.indexOf(ws);
    }
    if (index > -1) {
        activeSessions[sessionId].listeners.splice(index, 1);
    }

    setTimeout(() => {
        if (activeSessions[sessionId]) {
            activeSessions[sessionId].listeners.forEach(listenerWs => {
                if (listenerWs.readyState === WebSocket.OPEN) {
                    listenerWs.send(JSON.stringify({ type: 'requestEndSession', reason: 'disconnect' }));
                    listenerWs.close();
                }
            });
        }
    }, disconnectTime);

    if (confirmEnd) {
        activeSessions[sessionId].listeners.forEach(listenerWs => {
            if (listenerWs.readyState === WebSocket.OPEN) {
                listenerWs.send(JSON.stringify({ type: 'END_SESSION' }));
            }
        });
        activeSessions[sessionId].first = null;
        activeSessions[sessionId].second = null;
        delete sessionUsers[sessionId];
        delete activeSessions[sessionId];
    }

    //Expiration
    if (activeSessions[sessionId] &&
        activeSessions[sessionId].first === ws.userId) {
        activeSessions[sessionId].firstTimer = setTimeout(() => {
            activeSessions[sessionId].first = null;

            const userIndex = sessionUsers[sessionId].indexOf(ws.userId);
            if (userIndex > -1) {
                console.log(`${ws.userId} no longer in session`);
                usersInfo.splice(userIndex, 1);
            }

        }, expirationTime);

    } else if (activeSessions[sessionId] &&
        activeSessions[sessionId].second === ws.userId) {

        activeSessions[sessionId].secondTimer = setTimeout(() => {
            activeSessions[sessionId].second = null;

            const userIndex = sessionUsers[sessionId].indexOf(ws.userId);
            if (userIndex > -1) {
                console.log(`${ws.userId} no longer in session`);
                usersInfo.splice(userIndex, 1);
            }

        }, expirationTime);
    }

    if(activeSessions[sessionId]) {
        if (activeSessions[sessionId].listeners.length === 0 && activeSessions[sessionId].first === null && activeSessions[sessionId].second === null) {
            delete activeSessions[sessionId];
            delete sessionUsers[sessionId];
        }
    }

};


const handleKafkaMessage = async (message, wss) => {

    const { user1, user2, questionComplexity, questionType } = JSON.parse(message);

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
    handleKafkaMessage,
};