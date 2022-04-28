import { AUTH_SECRET } from "../../config/constants.config";

var jwt = require('jsonwebtoken');
const Message = require("../../models/message");

export default class adminMessageController {
    public getAllMessages = (req: any, res: any) => {
        const { support: { channelId }, query: { skip = 0, limit = 20, userId } } = req;
        Message.getMessages({ find: { userId, channelId }, skip, limit }, (err: any, messages: any[]) => {
            if (err) {
                return res.status(500).send({ status: false, message: "error loading the messages" });
            } else {
                return res.status(200).send({ status: true, messages });
            }
        });
    }
}