export default class adminAuthController {
    constructor () {}
    public auth = (req: any, res: any) => {
        const { user: { email, privateKey, role, username } } = req;
        res.send({ status : true, message : "authenticated", userInfo : { email, privateKey, role, username } })
    }
};
