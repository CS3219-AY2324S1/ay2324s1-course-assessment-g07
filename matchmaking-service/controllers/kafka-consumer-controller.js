const { Kafka, Partitioners, logLevel } = require('kafkajs')

const host = "localhost";

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`localhost:9092`],
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