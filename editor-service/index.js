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
  console.log(`a user connected with session ID: ${sessionId}`);
  if (!sessionSockets.has(sessionId)) {
    sessionSockets.set(sessionId, []);
  }

  const sockets = sessionSockets.get(sessionId);
  if (!sockets.includes(socket)) {
    sockets.push(socket);
  }
  
  ['left', 'right'].forEach(side => {
    const key = `${sessionId}-${side}`;
    const value = editorValues.get(key);
    if (value !== undefined) {
      socket.emit('editorUpdate', { sessionId, side, value });
    }
  });


  socket.on('editorChange', (data) => {
    const key = `${data.sessionId}-${data.side}`;
    editorValues.set(key, data.value);
    // Only broadcast to clients with the same session ID
    if (sessionSockets.has(data.sessionId)) {
      sessionSockets.get(data.sessionId).forEach(sessionSocket => {
        if (sessionSocket !== socket) {
          sessionSocket.emit('editorUpdate', data);
        }
      });
    }
  });

  socket.on('disconnect', () => {
    if (sessionSockets.has(sessionId)) {
      const sockets = sessionSockets.get(sessionId);
      const index = sockets.indexOf(socket);
      console.log('here');
      if (index > -1) {
        console.log('test');
        console.log(sockets.length);
        sockets.splice(index, 1);
      }

      if (sockets.length === 0) {
        console.log('session is Empty');
        sessionSockets.delete(sessionId);
      }
    }
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
