const amqp = require('amqplib');
const eventEmitter = require('./event-controller');
const complexityLevels = ['Easy', 'Medium', 'Hard'];
const questionTypes = ['Select Question Type', 'Dynamic Programming', 'String Slicing', 'Arrays', 'Sorting', 'Memoization', 'Strings']; //temporary
const MATCHMAKINF_SIZE = 2;
// queueName following the format of `matchmaking_queue_${complexity}_${type}`


const SERVER = 'amqp://localhost:5672';
const MATCHMAKING_EXCHANGE = 'matchmaking_exchange';

const initializeChannel = async () => {
    try {
        const connection = await amqp.connect(SERVER);
        if (!connection) {
            throw new Error('Failed to establish connection with RabbitMQ server');
        }
        const channel = await connection.createChannel();
        await channel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });

        complexityLevels.forEach((complexity) => {
            questionTypes.forEach((type) => {
                const queueName = `matchmaking_queue_${complexity}_${type}`;
                const routingKey = `${complexity}.${type}`;
                let waitingList = [];

                channel.assertQueue(queueName, { durable: false });
                channel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);

                channel.consume(queueName, (message) => {
                    const info = JSON.parse(message.content.toString());
                    const userId = info.userId;
                    const action = info.action;
                    console.log(userId, "'s request to ", action, " received at queue ", queueName);
                    if (action == 'add' && waitingList.length < MATCHMAKINF_SIZE - 1) {
                        console.log("empty")
                        waitingList.push(userId);
                        console.log(waitingList.length);
                        // console.log(waitingList);

                    } else if (action == 'add' && waitingList.length == MATCHMAKINF_SIZE - 1) {
                        console.log(`found a match between ${userId} and ${waitingList[0]}`);
                        const userId2 = waitingList[0];
                        const userId1 = userId;
                        eventEmitter.emit('matchFound', { userId1, userId2 });

                        // Assume the match size is always 2
                        waitingList.splice(0,waitingList.length);
                        console.log(waitingList.length);

                    } else if (action == 'delete') {
                        waitingList.splice(0,waitingList.length);
                        console.log(waitingList.length);
                    }

                    channel.ack(message);
                });
            })
        })

        console.log('Matchmaking queues set up and consuming messages.');
    } catch (error) {
        console.error('Error setting up matchmaking channel:', error);
    }

    console.log("connected to amqp server");

}

initializeChannel().catch(console.error);

const sendMatchmakingMessage = async (request) => {
    try {

        const message = JSON.parse(request);
        const complexity = message.questionComplexity;
        const userId = message.userId;
        const type = message.questionType;
        const action = message.action;

        const connection = await amqp.connect(SERVER);
        const channel = await connection.createChannel();
    
        await channel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });
        const routingKey = `${complexity}.${type}`;
    
        const messageToSend = {
            userId: userId,
            action: action
        }
        channel.publish(MATCHMAKING_EXCHANGE, routingKey, Buffer.from(JSON.stringify(messageToSend)));
    
        console.log(`User ${userId} sent to matchmaking queue with routing key: ${routingKey}`);
        
        setTimeout(() => {
          channel.close();
          connection.close();
        }, 500); 

      } catch (error) {
        console.error('Error sending matchmaking message:', error);
      }

};

module.exports = {
    send: sendMatchmakingMessage
};