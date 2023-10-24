const { Kafka, Partitioners } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'matchmaking-producer',
    brokers: ['localhost:9092'],
    createPartitioner: Partitioners.LegacyPartitioner,

});

const producer = kafka.producer();


const sendSessionInformation = async (sessionId, user1, user2, questionComplexity, questionType) => {
    const sessionInfo = {
        key: sessionId,
        value: JSON.stringify({user1:user1, user2: user2, questionComplexity: questionComplexity, questionType: questionType})
    };


    await producer.connect();
    await producer.send({
        topic: 'session-information',
        messages: [ sessionInfo ]
    })
}


module.exports = sendSessionInformation;

