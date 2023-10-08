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


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('editorChange', (data) => {
    socket.broadcast.emit('editorUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
