import { Schema, model } from "mongoose";

const userIdSchema = new Schema({
    userId: { type: String, required : true },
    privateKey : { type: String, required : true },
    channelId: { type: String, required : true },
    isResolved: { type: Boolean, default : false },
    isBotMode: { type: Boolean, default : false },
    userInfo: { type: Schema.Types.Mixed }
},{ timestamps: true });

userIdSchema.statics = {
    saveUserId : function (inputs: any, callback:Function) {
        const { userId, privateKey, channelId, isResolved=false, isBotMode=true, userInfo={} } = inputs;
        const UserId = new this({ userId, privateKey, channelId, isResolved, isBotMode, userInfo });
        return UserId.save().then((savedUserInfo:any) => {
            return callback(null, savedUserInfo);
        }).catch((err:any) => {
            callback(err, null);
        });
    },
};

// router.param('id', emailTemplateCtrl.load);

module.exports = model("userId", userIdSchema)