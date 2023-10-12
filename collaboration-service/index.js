const WebSocket = require('ws');
const {Kafka, Partitioners, logLevel} = require('kafkajs');
const {
    handleConnection,
    handleMessage,
    handleClose,
    handleKafkaMessage
} = require('./controllers/session-controller');

const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: ['localhost:9092'],
    clientId: 'matchmaking-consumer',
    createPartitioner: Partitioners.LegacyPartitioner ,
  });
  
  const topic = 'session-information';
  const consumer = kafka.consumer({ groupId: 'collaboration-service-consumer' });
  
  const runKafkaConsumer = async (wss) => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
        console.log(message.value.toString());
        const {user1, user2, questionComplexity, questionType } = JSON.parse(message.value.toString());
        console.log(user2);
        handleKafkaMessage(message.value.toString(), wss);
    },
    });
  };
  

const port = 8004;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws, req) => {
    handleConnection(ws, req);

    ws.on('message', (message) => {
        handleMessage(message, ws, req.url.substring(1));
    });

    ws.on('close', () => {
        handleClose(ws, req.url.substring(1));
    });
});

runKafkaConsumer(wss).catch(e => console.error(`[collaboration-service] ${e.message}`, e));

console.log(`WebSocket server listening on port ${port}`);
