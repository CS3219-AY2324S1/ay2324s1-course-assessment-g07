const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); 
const WebSocket = require('ws');

const wsController = require('./controllers/web-socket-controller');



require('dotenv').config();

const app = express();
app.use(express.json());
const server = http.createServer(app);
const wss = wsController.createWebSocket(server);

const port = 8002;
server.listen(port, () => {
  console.log(`matchmaking server is running on port ${port}`);
});





