const amqp = require('amqplib');
const eventEmitter = require('./event-controller');
const complexityLevels = ['Easy', 'Medium', 'Hard'];
const questionTypes = ['Dynamic Programming', 'String Slicing', 'Arrays', 'Sorting', 'Memoization'];

const createSequence = (lst) => {
    const dic = {};
    for (let i = 0; i < lst.length - 1; i++) {
        const current = lst[i];
        const nextIndex = (i + 1) % lst.length; 
        const next = lst[nextIndex];
        
        dic[current] = next; 
    }
    dic[lst[lst.length - 1]] = 'Any';
    dic['Any'] = lst[0];
    return dic;
}
const typeSequence = createSequence(questionTypes);
const complexitySequence = createSequence(complexityLevels);
// console.log(typeSequence);

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
        console.log(userId, "'s request to ", action, " received at queue ", queueName);
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
                console.log("last in the keylist, pushed")
                waitingList.push(userId);
            } else {
                console.log("move on to the next key");
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
    
    // const handleGenericMessage = (channel, message, waitingList) => {
    //     const info = JSON.parse(message.content.toString());
    //     const userId = info.userId;
    //     const action = info.action;
    //     const routingKeys = info.routingKeys;
    //     const index = info.index;
    //     console.log(userId, "'s request to ", action, " received at queue ", routingKeys[index]);

    //     if (action == 'add' && waitingList.length == MATCHMAKINF_SIZE - 1) {
    //         console.log(`found a match between ${userId} and ${waitingList[0]}`);
    //         const userId2 = waitingList[0];
    //         const userId1 = userId;
    //         eventEmitter.emit('matchFound', { userId1, userId2 });

    //         waitingList.splice(0,waitingList.length);
    //         console.log(waitingList.length);
    //     } else if (action == 'add' && waitingList.length < MATCHMAKINF_SIZE - 1) {
    //         // channel.ack(message);
    //         if (routingKeys.length == 0 || index == routingKeys.length - 1) {
    //             waitingList.push(userId);
    //             console.log("last in the keylist, pushed")
    //         } else {
    //             console.log("move on to next key")

    //             const messageToSend = {
    //                 userId: userId,
    //                 action: action,
    //                 routingKeys: routingKeys,
    //                 index: index + 1
    //             }
    //             channel.publish(MATCHMAKING_EXCHANGE, routingKeys[index + 1], Buffer.from(JSON.stringify(messageToSend)));
    //         }
    //         channel.ack(message);

    //     }
    // }

    try {
        const connection = await amqp.connect(SERVER);
        if (!connection) {
            throw new Error('Failed to establish connection with RabbitMQ server');
        }
        const channel = await connection.createChannel();
        const genericComplexityChannel = await connection.createChannel();
        const genericTypeChannel = await connection.createChannel();

        await channel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });
        await genericComplexityChannel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });
        await genericTypeChannel.assertExchange(MATCHMAKING_EXCHANGE, 'topic', { durable: false });

        // generic queue
        complexityLevels.forEach((complexity) => {
            const queueName = `matchmaking_generic_type_queue_${complexity}_Any`;
            const routingKey = `GenericType.${complexity}.Any`;
            genericTypeChannel.assertQueue(queueName, { durable: false });

            const waitingList = [];

            genericTypeChannel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);
            genericTypeChannel.consume(queueName, (message) => {
                handleMessage(genericTypeChannel, message, waitingList, queueName);

                console.log("receive msg at own queue:",  JSON.parse(message.content.toString()));
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

                console.log("receive msg at own queue:",  JSON.parse(message.content.toString()));
            });
        })

        // non-generic queue
        complexityLevels.forEach((complexity) => {
            questionTypes.forEach((type) => {
                const queueName = `matchmaking_queue_${complexity}_${type}`;
                const genericComplexityQueueName = `matchmaking_generic_complexity_queue_${complexity}_${type}`;
                const genericTypeQueueName = `matchmaking_generic_type_queue_${complexity}_${type}`;

                const routingKey = `${complexity}.${type}`;
                const genericComplexityRoutingKey = `GenericComplexity.${complexity}.${type}`;
                const genericTypeRoutingKey = `GenericType.${complexity}.${type}`;

                let waitingList = [];

                channel.assertQueue(queueName, { durable: false });
                genericComplexityChannel.assertQueue(genericComplexityQueueName, { durable: false });
                genericTypeChannel.assertQueue(genericTypeQueueName, { durable: false });

                channel.bindQueue(queueName, MATCHMAKING_EXCHANGE, routingKey);
                genericComplexityChannel.bindQueue(genericComplexityQueueName, MATCHMAKING_EXCHANGE, genericComplexityRoutingKey);
                genericTypeChannel.bindQueue(genericTypeQueueName, MATCHMAKING_EXCHANGE, genericTypeRoutingKey);

                // normal matchmaking within the queue
                channel.consume(queueName, (message) => {
                    console.log("non generic", message.content);
                    handleMessage(channel, message, waitingList, queueName);
                });

                // looking for available users with the same question type
                genericComplexityChannel.consume(genericComplexityQueueName, (message) => {
                    console.log("arrive at g complexity")
                    // const nextRoutingKey = `GenericComplexity.${complexitySequence[complexity]}.${type}`;
                    handleMessage(genericComplexityChannel, message, waitingList, genericComplexityQueueName);
                })       

                // looking for available users with the same complexity
                genericTypeChannel.consume(genericTypeQueueName, (message) => {
                    console.log("arrive at g type")
                    // const nextRoutingKey = `GenericType.${complexity}.${typeSequence[type]}`;
                    handleMessage(genericTypeChannel, message, waitingList, genericTypeQueueName);
                })   

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

        if (complexity != GENERIC_COMPLEXITY && type != GENERIC_TYPE) {
            const routingKeys = [];
            if (action == 'add') {
                routingKeys.push(`GenericType.${complexity}.Any`);
                routingKeys.push(`GenericComplexity.Any.${type}`);
            }
            // const routingKeys = [`${complexity}.${type}`];
            // const routingKey = `${complexity}.${type}`;
            routingKeys.push(`${complexity}.${type}`);
        
            const messageToSend = {
                userId: userId,
                action: action,
                routingKeys: routingKeys,
                index: 0
            }
            console.log(routingKeys);
            channel.publish(MATCHMAKING_EXCHANGE, routingKeys[0], Buffer.from(JSON.stringify(messageToSend)));
        
            console.log(`User ${userId} sent to matchmaking queue with routing key: ${routingKeys[0]}`);
        } else if (complexity == GENERIC_COMPLEXITY && type != GENERIC_TYPE) {
            //  only any complexity
            // const nextComplexity = complexitySequence['Any'];
            // const routingKey = action == 'add' ? `GenericComplexity.${nextComplexity}.${type}` : `GenericComplexity.Any.${type}`;
            const routingKeys = [];
            if (action == 'add') {
                complexityLevels.forEach(c => {
                    const key = `GenericComplexity.${c}.${type}`;
                    routingKeys.push(key);
                });
            }
            routingKeys.push(`GenericComplexity.Any.${type}`);

            const messageToSend = {
                userId: userId,
                action: action,
                routingKeys: routingKeys,
                index: 0
            }
            const key = routingKeys[0];
            channel.publish(MATCHMAKING_EXCHANGE, key, Buffer.from(JSON.stringify(messageToSend)));
        
            console.log(`User ${userId} sent to generic complexity queue with routing key: ${routingKeys[0]}`);

        } else if (complexity != GENERIC_COMPLEXITY && type == GENERIC_TYPE) {
            // only any type
            const nextType = typeSequence['Any'];
            const routingKeys = [];
            if (action == 'add') {
                questionTypes.forEach(t => {
                    const key = `GenericType.${complexity}.${t}`;
                    routingKeys.push(key);
                });
            }
            routingKeys.push(`GenericType.${complexity}.Any`);

            // const routingKey = action == 'add' ? `GenericType.${complexity}.${nextType}` : `GenericType.${complexity}.Any`;
        
            const messageToSend = {
                userId: userId,
                action: action,
                routingKeys: routingKeys,
                index: 0
            }
            channel.publish(MATCHMAKING_EXCHANGE, routingKeys[0], Buffer.from(JSON.stringify(messageToSend)));
        
            console.log(`User ${userId} sent to generic type queue with routing key: ${routingKeys[0]}`);

        }
    

        
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