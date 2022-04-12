import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    messageType: { type: String, required : true, enum : [ "supportMessage", "botMessage", "userMessage", "broadcast", "peerToPeer", "endPoint"] },
    messageFormat: { type: String, required : true }, // poll, text, images, file, etc
    privateKey : { type: String, required : true },
    channelId: { type: String, required : true },
    userId: { type: String },
    isDeleted: { type: Boolean, default : false },
    description: { type: String },
    data: { type: Schema.Types.Mixed }
},{ timestamps: true });

messageSchema.statics = {
    saveMessage : function (inputs: any, callback:Function) {
        const { messageType, messageFormat, privateKey, channelId, userId, isDeleted, description, data } = inputs;
        const Message = new this({ messageType, messageFormat, privateKey, channelId, userId, isDeleted, description, data });
        return Message.save().then((message:any) => {
            return callback(null, message);
        }).catch((err:any) => {
            callback(err, null);
        });
    },
};

// router.param('id', emailTemplateCtrl.load);

module.exports = model("message", messageSchema)