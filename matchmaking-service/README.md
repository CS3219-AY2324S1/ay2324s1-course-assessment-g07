## Getting Started

You will need to run the rabbitMQ and kafka docker container locally.
Run
```bash
docker-compose up
```
to start all the containers

Then launch the matchmaking service using:

```bash
npm start
```

continue with the usual workflow...

## How to receive session id and user ids from Kafka

First, create a kafka-consumer-controller in the respective service (refer to matchmaking-service/controllers/kafka-consumer-controller)

Second, update package.json to run the consumer controller
```bash
  "scripts": {
    "start": "node index & node ./controllers/kafka-consumer-controller"
  }
```

After a successful match, the kafka consumer should receive the message `session-information[0 | 8] / ${sessionId}#{"user1":${userId1},"user2":${userId2}}`
