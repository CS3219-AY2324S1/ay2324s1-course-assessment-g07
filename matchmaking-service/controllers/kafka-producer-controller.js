const { Kafka, Partitioners } = require('kafkajs')

const host = process.env.NODE_ENV === "production" ? process.env.KAFKA_HOST : "localhost:9092";

console.log("kafka host:", host);
console.log("zookeeper host:", process.env.ZOOKEEPER_HOST);
console.log("kafka client username: ", process.env.KAFKA_PRODUCER_USERNAME);
console.log("kafka client passowrd: ", process.env.KAFKA_PRODUCER_PASSWORD);


const kafka = process.env.NODE_ENV != "production" ? new Kafka({
    clientId: 'matchmaking-producer',
    brokers: [host],
    createPartitioner: Partitioners.LegacyPartitioner,
}) : new Kafka({
    clientId: 'matchmaking-producer',
    brokers: [host],
    createPartitioner: Partitioners.LegacyPartitioner,
    sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_PRODUCER_USERNAME,
        password: process.env.KAFKA_PRODUCER_PASSWORD,
    },
})
;

const producer = kafka.producer();


const sendSessionInformation = async (sessionId, user1, user2, questionComplexity, questionType) => {
    const sessionInfo = {
        key: sessionId,
        value: JSON.stringify({user1:user1, user2: user2, questionComplexity: questionComplexity, questionType: questionType})
    };

    console.log("session information:", sessionInfo);
    await producer.connect();
    console.log("connected to kafka")
    await producer.send({
        topic: 'session-information',
        messages: [ sessionInfo ]
    })
}

module.exports = sendSessionInformation;

