const WebSocket = require('ws');
const { Kafka, Partitioners, logLevel } = require('kafkajs');
const {
    handleConnection,
    handleMessage,
    handleClose,
    handleKafkaMessage
} = require('./controllers/session-controller');


const host = process.env.NODE_ENV === "production" ? process.env.KAFKA_HOST : ":9092";

console.log('Starting on host (index.js) ', host);

const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [host],
    clientId: 'matchmaking-consumer',
    createPartitioner: Partitioners.LegacyPartitioner,
    sasl: {
        mechanism: 'plain',
        username: 'user1',
        password: '5PipD4K1m7'
    },
    securityProtocol: 'sasl_plaintext'
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
            handleKafkaMessage(message.value.toString(), message.key.toString(), wss);
        },
    });
};


const port = 8004;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws, req) => {
    console.log('connection established');
    handleConnection(ws, req);

    ws.on('message', (message) => {
        handleMessage(message, ws, req.url.substring(1));
    });

    ws.on('close', () => {
        console.log('close event triggered');
        handleClose(ws, req.url.substring(1));
    });
});

runKafkaConsumer(wss).catch(e => console.error(`[collaboration-service] ${e.message}`, e));

console.log(`WebSocket server listening on port ${port}`);
