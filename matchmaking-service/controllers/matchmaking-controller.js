
const amqp = require('amqplib');
const eventEmitter = require('./event-controller');
const questionData = require('./data')
const complexityLevels = ['Easy', 'Medium', 'Hard'];
// const questionTypes = ['Dynamic Programming', 'String Slicing', 'Arrays', 'Sorting', 'Memoization'];
const questionTypes = questionData.categoriesOptions.map(category => category.value);
// console.log( questionTypes)
const GENERIC_COMPLEXITY = 'Any';
const GENERIC_TYPE = 'Any';
const MATCHMAKINF_SIZE = 2;
// queueName following the format of `matchmaking_queue_${complexity}_${type}`


const SERVER = 'amqp://localhost:5672';
const MATCHMAKING_EXCHANGE = 'matchmaking_exchange';

const initializeChannel = async () => {
    const handleMessage = (channel, message, waitingList, queueName) => {
        const info = JSON.parse(message.content.toString());
        const userId = info.userId;
        const action = info.action;
        const routingKeys = info.routingKeys;
        const index = info.index;
        // console.log(userId, "'s request to ", action, " received at queue ", queueName);
        if (action == 'add' && waitingList.length == MATCHMAKINF_SIZE - 1) {
            console.log(`found a match between ${userId} and ${waitingList[0]}`);
            const userId2 = waitingList[0];
            const userId1 = userId;
            eventEmitter.emit('matchFound', { userId1, userId2 });

            // Assume the match size is always 2
            waitingList.splice(0,waitingList.length);
            console.log(waitingList.length);
        } else if (action == 'add' && waitingList.length < MATCHMAKINF_SIZE - 1) {
            // channel.ack(message);
            if (routingKeys.length == 0 || index == routingKeys.length - 1) {
                // console.log("last in the keylist, pushed")
                waitingList.push(userId);
            } else {
                // console.log("move on to the next key");
                const messageToSend = {
                    userId: userId,
                    action: action,
                    routingKeys: routingKeys,
                    index: index + 1
                }
                channel.publish(MATCHMAKING_EXCHANGE, routingKeys[index + 1], Buffer.from(JSON.stringify(messageToSend)));
            }
        } else if (action == 'delete') {
            waitingList.splice(0,waitingList.length);
            console.log(waitingList.length);
        }

        channel.ack(message);
    };
    
    try {
        const connection = await amqp.connect(SERVER);
        if (!connection) {
            throw new Error('Failed to establish connection with RabbitMQ server');
        }
        const channel = await connection.createChannel();
        const genericComplexityChannel = await connection.createChannel();
        const genericTypeChannel = await connection.createChannel();
        const genericChannel = await connection.createChannel();

        await channel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });
        await genericComplexityChannel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });
        await genericTypeChannel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });
        await genericChannel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });

        // generic queue
        
        [''].forEach(( arg ) => {
            const queueName = `matchmaking_generic_queue`;
            const routingKey = `Generic`;
            genericChannel.assertQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);

            const waitingList = [];

            genericChannel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);
            genericChannel.consume(queueName, (message) => {
                handleMessage(genericChannel, message, waitingList, queueName);
            });
        })

        complexityLevels.forEach((complexity) => {
            const queueName = `matchmaking_generic_type_queue_${complexity}_Any`;
            const routingKey = `GenericType.${complexity}.Any`;
            genericTypeChannel.assertQueue(queueName, { durable: false });

            const waitingList = [];

            genericTypeChannel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);
            genericTypeChannel.consume(queueName, (message) => {
                handleMessage(genericTypeChannel, message, waitingList, queueName);
            });
        })

        questionTypes.forEach((type) => {
            const queueName = `matchmaking_generic_complexity_queue_Any_${type}`;
            const routingKey = `GenericComplexity.Any.${type}`;
            genericComplexityChannel.assertQueue(queueName, { durable: false });
            const waitingList = [];

            genericComplexityChannel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);
            genericComplexityChannel.consume(queueName, (message) => {
                handleMessage(genericComplexityChannel, message, waitingList, queueName);
            });
        })

        // non-generic queue
        complexityLevels.forEach((complexity) => {
            questionTypes.forEach((type) => {
                const queueName = `matchmaking_queue_${complexity}_${type}`; // non-generic
                const genericComplexityQueueName = `matchmaking_generic_complexity_queue_${complexity}_${type}`; // only generic complexity
                const genericTypeQueueName = `matchmaking_generic_type_queue_${complexity}_${type}`; // only generic type
                // const genericQueueName = 'matchmaking_generic_queue'; // both generic

                const routingKey = `${complexity}.${type}`;
                const genericComplexityRoutingKey = `GenericComplexity.${complexity}.${type}`;
                const genericTypeRoutingKey = `GenericType.${complexity}.${type}`;
                // const genericRoutingKey = 'Generic';

                let waitingList = [];

                channel.assertQueue(queueName, { durable: false });
                genericComplexityChannel.assertQueue(genericComplexityQueueName, { durable: false });
                genericTypeChannel.assertQueue(genericTypeQueueName, { durable: false });
                // genericChannel.assertQueue(genericQueueName, { durable: false });

                channel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);
                genericComplexityChannel.bindQueue(genericComplexityQueueName, MATCHMAKING_EXCHANGE, genericComplexityRoutingKey);
                genericTypeChannel.bindQueue(genericTypeQueueName, MATCHMAKING_EXCHANGE, genericTypeRoutingKey);
                // genericChannel.bindQueue(genericQueueName, MATCHMAKING_EXCHANGE, genericRoutingKey);

                // normal matchmaking within the queue
                channel.consume(queueName, (message) => {
                    console.log("non generic", message.content);
                    handleMessage(channel, message, waitingList, queueName);
                });

                // looking for available users with the same question type
                genericComplexityChannel.consume(genericComplexityQueueName, (message) => {
                    console.log("arrive at g. complexity")
                    handleMessage(genericComplexityChannel, message, waitingList, genericComplexityQueueName);
                });       

                // looking for available users with the same complexity
                genericTypeChannel.consume(genericTypeQueueName, (message) => {
                    console.log("arrive at g. type")
                    handleMessage(genericTypeChannel, message, waitingList, genericTypeQueueName);
                });
                
                // looking for any user
                // genericChannel.consume(genericQueueName, (message) => {
                //     console.log("arrive at generic")
                //     handleMessage(genericChannel, message, waitingList, genericQueueName);
                // });   

            });

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
        const routingKeys = [];
        if (complexity != GENERIC_COMPLEXITY && type != GENERIC_TYPE) {
            // specific search
            if (action == 'add') {
                routingKeys.push(`Generic`);
                routingKeys.push(`GenericType.${complexity}.Any`);
                routingKeys.push(`GenericComplexity.Any.${type}`);
            }
            routingKeys.push(`${complexity}.${type}`);

        } else if (complexity == GENERIC_COMPLEXITY && type != GENERIC_TYPE) {
            //  only any complexity
            if (action == 'add') {
                routingKeys.push(`Generic`);

                complexityLevels.forEach(c => {
                    routingKeys.push(`GenericComplexity.${c}.${type}`);
                    routingKeys.push(`GenericType.${c}.Any`);
                });
            }
            routingKeys.push(`GenericComplexity.Any.${type}`);

        } else if (complexity != GENERIC_COMPLEXITY && type == GENERIC_TYPE) {
            // only any type
            if (action == 'add') {
                routingKeys.push(`Generic`);

                questionTypes.forEach(t => {
                    routingKeys.push(`GenericType.${complexity}.${t}`);
                    routingKeys.push(`GenericComplexity.Any.${t}`);
                });

            }
            routingKeys.push(`GenericType.${complexity}.Any`);
        } else {
            // any type and any difficulty
            if (action == 'add') {
                questionTypes.forEach(t => {
                    routingKeys.push(`GenericComplexity.Any.${t}`);
                    complexityLevels.forEach(c => {
                        routingKeys.push(`GenericType.${c}.Any`);
                        routingKeys.push(`${c}.${t}`);
                    })
                })
            }
            
            routingKeys.push(`Generic`);
        }

        const messageToSend = {
            userId: userId,
            action: action,
            routingKeys: routingKeys,
            index: 0
        }
    
        channel.publish(MATCHMAKING_EXCHANGE, routingKeys[0], Buffer.from(JSON.stringify(messageToSend)));
        console.log(routingKeys);

        
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