const WebSocket = require('ws');
const collaborationServerUrl = 'ws://localhost:8081'; 

const handleSessionCreation = (user1, user2) => {
  console.log('received user sockets from matchmaking service');
  const sessionId = generateSessionId();
  createSession(user1, user2, sessionId);
};

const createSession = (user1, user2, sessionId) => {
  user1.send('matched'); // Send a message to user1
  user2.send('matched'); // Send a message to user2
  // the user information of the 2 users can be obtained here
  console.log(`common session created: ${sessionId} with user1 (${user1.userId}) ${user1.username} and user2 (${user2.userId}) ${user2.username} `);
  const user1Info = {
    username: user1.username,
    userId: user1.userId
  }
  const user2Info = {
    username: user2.username,
    userId: user2.userId
  }
  // Send session information to matched users
  user1.send(JSON.stringify({ type: 'sessionId', data: sessionId }));
  user2.send(JSON.stringify({ type: 'sessionId', data: sessionId }));
}

const generateSessionId = () => {
  const timestamp = new Date().getTime(); 
  const random = Math.floor(Math.random() * 10000);
  return `${timestamp}-${random}`;
}

module.exports = handleSessionCreation;
