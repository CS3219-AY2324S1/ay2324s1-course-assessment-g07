const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); 
const createWebSocketServer = require('./controllers/matchmaking-controller');
require('dotenv').config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'http://localhost:8001',
  'http://localhost:8002',
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log(origin);
      console.log({ origin });
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.json());

// const userRoutes = require('./routes/matchmaking-routes');
const server = http.createServer(app); // Create an HTTP server
const wss = createWebSocketServer(server); 
// app.use('/users', userRoutes);

const port = 8002;
server.listen(port, () => {
  console.log(`web socket server is running on port ${port}`);
});