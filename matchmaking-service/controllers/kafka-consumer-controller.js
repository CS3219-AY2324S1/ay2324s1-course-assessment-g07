const { Kafka, Partitioners, logLevel } = require('kafkajs')
require('dotenv').config();

const host = process.env.NODE_ENV === "production" ? process.env.KAFKA_HOST : "localhost:9092";

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [host],
  clientId: 'matchmaking-consumer',
  createPartitioner: Partitioners.LegacyPartitioner 
})

const topic = 'session-information';
const consumer = kafka.consumer({ groupId: 'collaboration-service' });

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
    },
  })
};

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));