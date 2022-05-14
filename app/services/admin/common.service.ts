var jwt = require('jsonwebtoken');
import { loginJwtSecret, supportJwtSecret } from "../../config/constants.config"

const authenticate = (req: any, res: any, next: Function) => {

    // console.log({originalUrl : req.originalUrl}) // '/admin/new?sort=desc'
    // console.log({baseUrl : req.baseUrl}) // '/admin'
    // console.log({path : req.path}) // '/new'

    const nonSecurePaths = ['/login/login', '/about', '/contact'];
    if (nonSecurePaths.includes(req.path)) return next();

    // console.log( "nonSecure ? ", nonSecurePaths.includes(req.path))

    const unAuthorized = (reason: number = 0) => {
        let message = reason ? "Token invalid." : "Missing authentication token.";
        return res.status(401).send({ status: false, message, tokenInvalid: Boolean(reason) })
    }

    const authorise = (payload: any) => {
        req.user = payload;
        return next()
    }

    const tokenVerification = (token: any) => {
        jwt.verify(token, loginJwtSecret, { complete: true }, (err: any, userInfo: any) => {
            return err ? unAuthorized(1) : authorise(userInfo.payload)
        });
    }

    const { admintoken } = req.headers;
    // console.log(req.path , req)
    return admintoken ? tokenVerification(admintoken) : unAuthorized(0);
}

const authenticateSupport = (req: any, res: any, next: Function) => {
    
    const unAuthorized = (reason: number = 0) => {
        let message = reason ? "Token invalid." : "Missing authentication support token.";
        return res.status(401).send({ status: false, message, tokenInvalid: Boolean(reason) })
    }
    
    const authorise = (payload: any) => {
        req.support = payload;
        return next();
    }
    
    const tokenVerification = (token: any) => {
        jwt.verify(token, supportJwtSecret, { complete: true }, (err: any, userInfo: any) => {
            return err ? unAuthorized(1) : authorise(userInfo.payload);
        });
    }
    
    const { supporttoken } = req.headers;
    console.log(req.headers)
    return supporttoken ? tokenVerification(supporttoken) : unAuthorized(0);
}
export { authenticate, authenticateSupport };