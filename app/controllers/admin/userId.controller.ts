const jwt = require('jsonwebtoken');

const User = require("../../models/user");
const Channel = require("../../models/channel");
const UserId = require("../../models/userId");

// import { generateUserId } from "../../config/constants.config";

export default class adminUserIdController {
    public getUserIds = (req:any, res:any) => {
        const { channelId } = req.support;
        UserId.find({ isResolved : false, channelId }, (err:any, userIds:any[]) => {
            res.send({ err, userIds })
        })
    }
}