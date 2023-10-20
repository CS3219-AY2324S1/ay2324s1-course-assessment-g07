const { initializeApp } = require("firebase/app");
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');

// Your web app's Firebase configuration stored in .env file locally
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const server = http.createServer(app); // Create an HTTP server

app.get('/firebase-app-initialised', (req, res) => {
  res.status(200).send({
    firebaseApp: firebaseApp,
  })

  console.log("Sent back firebase app to frontend: " , firebaseApp);
});

const port = 8003;
server.listen(port, () => {
  console.log(`web socket server is running on port ${port}`);
});