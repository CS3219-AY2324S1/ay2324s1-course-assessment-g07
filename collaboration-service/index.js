const WebSocket = require('ws');
const {
    handleConnection,
    handleMessage,
    handleClose,
} = require('./controllers/session-controller');

const port = 8004;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws, req) => {
    handleConnection(ws, req);

    ws.on('message', (message) => {
        handleMessage(message, ws, req.url.substring(1), wss);
    });

    ws.on('close', () => {
        handleClose(ws, req.url.substring(1));
    });
});

console.log(`WebSocket server listening on port ${port}`);
