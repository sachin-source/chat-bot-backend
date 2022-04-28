import { AUTH_SECRET } from "../../config/constants.config";

var jwt = require('jsonwebtoken');
const Message = require("../../models/message");

export default class clientMessageController {
    public getAllMessages = (req:any, res:any) => {
        const { headers : { userToken } } = req;
        jwt.verify(userToken, AUTH_SECRET, { complete: true }, (err: any, userInfo: any) => {
            const { userId } = userInfo;
            Message.getMessages({ find : { userId } }, (err : any, messages: any[]) => {
                if (err) {
                    return res.status(500).send({ status : false, message : "error loading the messages"});
                } else {
                    return res.status(200).send({ status : true, messages });
                }
            })
        });
    }
}