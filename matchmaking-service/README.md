## Getting Started

You will need to run the rabbitMQ docker container locally.
First run the following to pull the rabbitMQ Docker image:

```bash
docker pull rabbitmq
```

Then run a RabbitMQ container on port 5672 for AMQP with the following command:

```bash
docker run -d --name rabbitmq-container -p 5672:5672 -p 15672:15672 rabbitmq
```

Finally launch the matchmaking service using:

```bash
npm start
```

