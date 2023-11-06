const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

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

const io = socketIo(server, {
    cors: corsOptions
});

const sessionSockets = new Map();
const editorValues = new Map();

io.on('connection', (socket) => {
  const sessionId = socket.handshake.query.sessionId;
  const isReadOnly = socket.handshake.query.isReadOnly === 'true';

  if (!sessionSockets.has(sessionId)) {
    sessionSockets.set(sessionId, { readOnlySockets: [], writableSockets: [] });
  }

  const session = sessionSockets.get(sessionId);
  if (isReadOnly) {
    session.readOnlySockets.push(socket);
  } else {
    session.writableSockets.push(socket);
  }

  socket.on('editorChange', (data) => {
    const key = `${data.sessionId}`;
    editorValues.set(key, data.value);
  
    if (sessionSockets.has(data.sessionId)) {
      const session = sessionSockets.get(data.sessionId);
      session.readOnlySockets.forEach(sessionSocket => {
        if (sessionSocket !== socket) {
          sessionSocket.emit('editorUpdate', data);
        }
      });
    }
  });
  

  socket.on('disconnect', () => {
    if (sessionSockets.has(sessionId)) {
      const session = sessionSockets.get(sessionId);
      let index;

      if (isReadOnly) {
        index = session.readOnlySockets.indexOf(socket);
        if (index > -1) {
          session.readOnlySockets.splice(index, 1);
        }
      } else {
        index = session.writableSockets.indexOf(socket);
        if (index > -1) {
          session.writableSockets.splice(index, 1);
        }
      }

      if (session.readOnlySockets.length === 0 && session.writableSockets.length === 0) {
        sessionSockets.delete(sessionId);
      }
    }
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
