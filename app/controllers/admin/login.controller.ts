var User = require("../../models/user")
var jwt = require('jsonwebtoken');
import { jwtSecret } from "../../config/constants.config"

export default class adminLoginController {

    /**
     * User login
     */
    public login = (req: any, res: any) => {
        const { password, email } = req.query;
        User.findOne({ email }, (err: any, user: any) => {
            User.comparePassword(password, user.password, (err: any, matched: any) => {
                if (err || !matched) return res.status(401).send({ err: true, message: "Invalid password." });

                const { username, privateKey, role, channelId } = user;
                var adminToken = jwt.sign({ email, username, privateKey, role, channelId }, jwtSecret);
                res.send({ adminToken, err: false, email, username, privateKey, role, channelId });
            });
        });
    }

    /**
     * Legacy code to create new user explicitely
     * So keeping private
     */
    public index = (req: any, res: any) => {
        const { password, username, email, channelId } = req.query;
        const user = new User({ username, password, email, channelId });
        user.save().then((result: any) => {
            res.send({ err:false, result })
        }).catch((err: any) => {
            res.send({ err, result:false })
        });
    }
}