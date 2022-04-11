var amqp = require('amqplib/callback_api');

const Message = require("../../models/message")

export default class clientMessageReceiver {
    messageQueue:any;
    queue = 'incomingMessages';
    constructor(){
        amqp.connect('amqp://localhost', (error0: any, connection: any) => {
            if (error0) { throw error0 }
            console.log(error0 ? "error connecting rabbitmq" : "connected to rabbitmq")
            connection.createChannel((error1: any, channel: any) => {
                if (error1) {
                    throw error1;
                }
                channel.assertQueue(this.queue, { durable: false });
                this.recieveQueueData(channel);
            });
        });
    }
    recieveQueueData(channel:any){
        channel.consume(this.queue, function(msg:any) {
            const messageString = msg.content.toString();
            console.log(" [x] Received %s", messageString);
            Message.saveMessage(JSON.parse(messageString), (err:any, saved:any) => {
                console.log({ err, saved })
            })
          }, { noAck: true });
    }
}
