require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const http = require('http');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'http://localhost:8001',
  'http://localhost:8002',
  'http://localhost:8006',
  // node ip
  'http://34.123.40.181:30800',
  'http://34.123.40.181:30700',
  'http://34.123.40.181:30600',
  'http://34.123.40.181:30500',
  'http://34.123.40.181:30400',
  'http://34.123.40.181:30300',
  'http://34.123.40.181:30200',
  'http://34.123.40.181:30100',
  'http://34.123.40.181:30000',
  // frontend ip
  'http://34.68.28.7:3000',
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));
app.use(express.json());

const firebaseConfigRoute = require('./routes/firebaseConfig-route');

app.use('/', firebaseConfigRoute);

const server = http.createServer(app); // Create an HTTP server
const port = process.env.PORT || 8003;

server.listen(port, () => {
  console.log(`web socket server is running on port ${port}`);
});