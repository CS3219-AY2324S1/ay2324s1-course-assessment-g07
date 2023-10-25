require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const http = require('http');

app.use(cors());
app.use(express.json());

const firebaseConfigRoute = require('./routes/firebaseConfig-route');

app.use('/', firebaseConfigRoute);

const server = http.createServer(app); // Create an HTTP server
const port = 8003;
server.listen(port, () => {
  console.log(`web socket server is running on port ${port}`);
});