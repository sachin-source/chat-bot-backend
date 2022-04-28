var mongoose = require("mongoose");

import { generateChannelKey } from "../config/constants.config";

const ChannelSchema : typeof mongoose.Schema = new mongoose.Schema({
    channelName: { type: String, required : true },
    channelId: { type: String, default : generateChannelKey(), unique : true },
    isActive: { type: Boolean, default : false },
    description: { type: String },
    privateKey : { type: String, required : true }
},{ timestamps: true });

ChannelSchema.statics = {
    createChannel : async function (inputs: any, callback:Function) {
        const { channelName = '', description = '', privateKey = '', isActive } = inputs;
        const isChannelExists = await this.findOne({ channelName, privateKey });
        return isChannelExists ? callback(  false, isChannelExists  ) : this.saveChannel( { channelName, description, privateKey, isActive }, (err:any, updated:any)=>{
            return callback(  err, isChannelExists  );
        })
    },
    saveChannel : function (inputs: any, callback:Function)  {
        const { channelName = '', description = '', privateKey = '', isActive = false } = inputs;
        const Channel = new this({ channelName, description, privateKey, isActive });
        return Channel.save().then((channel:any) => {
            return callback(null, channel);
        }).catch((err:any) => {
            callback(err, null);
        });
    },
    getChannelByChannelId : function(channelId : string, callback:Function){
        this.findOne({ channelId }, {projection:{ _id: 0 }}, callback);
    },
    updateChannelByChannelId : function(inputs : any, callback:Function){
        const { channelName = '', description = '', privateKey = '', isActive, channelId } = inputs;
            this.updateOne({ channelId }, { $set : { channelName, description, privateKey, isActive }}, callback);
    },
    getChannels : function({ params = {}, fetch = {}, skip = 0, limit = 50, sort = { } }, callback:Function) {
        let sortBy = {};
        return this.find(params, fetch).sort(sortBy)
            .skip(+skip).limit(+limit)
            .exec(callback);
    }
};

// router.param('id', emailTemplateCtrl.load);

module.exports = mongoose.model("channel", ChannelSchema)