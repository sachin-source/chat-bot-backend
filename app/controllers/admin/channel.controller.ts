var Channel = require("../../models/channel");

export default class adminChannelController {
    // constructor () {
    //     const privateKey = "eaogYihQoj4QO0vn";
    //     const channelName = 'tempchannel', isActive = true, description = "asdf";
    //     Channel.createChannel({ privateKey, channelName, isActive, description }, (err: any, isChannelExists: boolean) => {
    //         console.log({ err, isChannelExists })
    //     })
    // }

    public create = (req: any, res: any) => {
        const { user: { privateKey }, body: { channelName, isActive, description } } = req;
        Channel.createChannel({ privateKey, channelName, isActive, description }, (err: any, isChannelExists: boolean) => {
            let message = err ? "Channel not created. Please try again" : (isChannelExists ? "Channel with this name already exists." : "Channel created successfully.");
            return res.send({ err, isChannelExists, message });
        });
    };

    public getByChannelId = (req: any, res: any, next: Function) => {
        const { params: { channelId } } = req;
        Channel.getChannelByChannelId(channelId, (err: any, channel: any) => {
            Object.assign(req, { err, channel });
            next();
        });
    };

    public getChannel = (req: any, res: any) => {
        const { err, channel } = req;
        res.send({ err, channel });
    }

    public updateChannel = (req: any, res: any) => {
        const { err, channel, params: { channelId }, body } = req;
        const channelData = { ...channel, ...body };
        const { privateKey, channelName, isActive, description } = channelData;
        Channel.updateChannelByChannelId({ privateKey, channelName, isActive, description }, (err: any, updated: any) => {
            res.send({ err: Boolean(err), channelData, message: Boolean(err) ? "Channel updation failed" : "Channel updation success" })
        });
    }
}

/**
 * 
 * update the above data by channelId
 * 
 */

// const returnedTarget = Object.assign(target, source);