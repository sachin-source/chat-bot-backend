var amqp = require('amqplib/callback_api');

const Message = require("../../models/message")

export default class clientMessageReceiver {
    messageQueue:any;
    incomingMessageQueue = 'incomingMessages';
    savedMessageQueue = 'savedMessages';
    constructor(){
        amqp.connect('amqp://localhost', (error0: any, connection: any) => {
            if (error0) { throw error0 }
            console.log(error0 ? "error connecting rabbitmq" : "connected to rabbitmq")
            connection.createChannel((error1: any, savedMessageChannel: any) => {
                if (error1) {
                    throw error1;
                }
                savedMessageChannel.assertQueue(this.savedMessageQueue, { durable: false });
                connection.createChannel((error1: any, incomingMessageChannel: any) => {
                    if (error1) {
                        throw error1;
                    }
                    incomingMessageChannel.assertQueue(this.incomingMessageQueue, { durable: false });
                    this.recieveQueueData({incomingMessageChannel, savedMessageChannel});
                });
            });
        });
    }
    recieveQueueData(channels:any){
        const { incomingMessageChannel, savedMessageChannel } = channels;
        incomingMessageChannel.consume(this.incomingMessageQueue, (msg:any) =>{
            const messageString = msg.content.toString();
            console.log(" [x] Received %s", messageString);
            Message.saveMessage(JSON.parse(messageString), (err:any, saved:any) => {
                console.log({ err, saved })
                const messageToQueue = JSON.stringify(saved)
                savedMessageChannel.sendToQueue(this.savedMessageQueue, Buffer.from(messageToQueue));
            })
          }, { noAck: true });
          
    }
}
