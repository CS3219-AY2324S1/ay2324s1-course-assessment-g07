/**
 * Connect to firebase here & get the following from collaboration service:
 * 1. User1 id
 * 2. User2 id
 * 3. sessionId
 */
const { initializeApp } = require("firebase/app");
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');

app.use(cors());
app.use(express.json());

// create an endpoint on this localhost:8003 to receive the session information from collaboration service
app.post('/chat-service-id-information', (req, res) => {

  // const { parsedMessage } = req.body;
  // // console.log('parsedMessage: ', parsedMessage.data);
  // // console.log('received session information from collaboration service');

  const { sessionId, user1Info, user2Info } = req.body;
  console.log('received session information from collaboration service');
  console.log('sessionId: ', sessionId);
  console.log('user1Info: ', user1Info);
  console.log('user2Info: ', user2Info);
  res.send('received session information from collaboration service');
});


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const server = http.createServer(app); // Create an HTTP server

const port = 8003;
server.listen(port, () => {
  console.log(`web socket server is running on port ${port}`);
});