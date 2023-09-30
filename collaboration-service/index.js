const WebSocket = require('ws');
const port = 8004
const wss = new WebSocket.Server({ port });

const activeSessions = {};
//  collaoboration logic goes here