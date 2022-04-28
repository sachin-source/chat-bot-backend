const jwt = require('jsonwebtoken');

const User = require("../../models/user");
const Channel = require("../../models/channel");
const UserId = require("../../models/userId");

import { generateUserId, AUTH_SECRET } from "../../config/constants.config";


export default class widgetAuthController {
    
    /**
     * 
     * @param req request
     * @param res response
     * @description use this only for authenticating the widgets not for others, use authentication along with generateToken for support.
     */
    public generateToken = (req:any, res:any) => {
        const { privateKey, channelId } = req.query;
        User.exists( { privateKey }, (err: any, isPrivateKeyExists:boolean) => {
            if(!err && isPrivateKeyExists) {
                Channel.exists( { channelId }, (err: any, isChannelExists:boolean) => {
                    if(!err && isChannelExists) {
                        const userId = generateUserId();
                        const token = jwt.sign( { privateKey, channelId, userId }, AUTH_SECRET );
                        UserId.saveUserId({ userId, privateKey, channelId }, (err:any, savedUserInfo:any) => {
                            Boolean(err) ? res.status(500).send({ status : false, message : "error with the query"}) : res.send({ status : true, token, userId });
                        });
                    } else if ( !isChannelExists ) {
                        res.status(400).send({ status : false, message : "UnAuthenticated channelId" });
                    } else {
                        res.status(500).send({ status : false, message : "error with the query"});
                    }
                })
            } else if ( !isPrivateKeyExists ) {
                res.status(400).send({ status : false, message : "UnAuthenticated privateKey" });
            } else {
                res.status(500).send({ status : false, message : "error with the query"});
            }
        });
    }
}