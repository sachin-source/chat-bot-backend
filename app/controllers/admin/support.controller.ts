const jwt = require("jsonwebtoken")
const Channel = require("../../models/channel");

import { supportJwtSecret } from "../../config/constants.config";

export default class adminSupportController {
    constructor () {}

    public generateSupportToken = (inputParams:any) => {
        const { _id, channelId } = inputParams;
        return jwt.sign({ _id, channelId }, supportJwtSecret);
    }

    public getAdminSupportToken = (req:any, res:any) => {
        const { user : { _id, privateKey }, query : { channelId } } = req;
        return ( !_id || !channelId ) ? res.status(400).send({ status : false, message : "request unAuthorized" }) :
        Channel.findOne({ privateKey, channelId }, (err:any, channelData:any) => {
            const supportToken = this.generateSupportToken({ _id, channelId, privateKey });
            return ( err || !channelData ) ? res.status(400).send({ status : false, message : "request unAuthorized" }) :
            res.send({ status : true, supportToken });
        })
    }

    // public getSupportToken = (req:any, res:any) => {
    //     const 
    // }
}