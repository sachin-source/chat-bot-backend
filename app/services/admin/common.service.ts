var jwt = require('jsonwebtoken');
import { loginJwtSecret, supportJwtSecret } from "../../config/constants.config"

const  authenticate = (req:any, res:any, next:Function) => {

    // console.log({originalUrl : req.originalUrl}) // '/admin/new?sort=desc'
    // console.log({baseUrl : req.baseUrl}) // '/admin'
    // console.log({path : req.path}) // '/new'

    const nonSecurePaths = ['/login', '/about', '/contact'];
    if (nonSecurePaths.includes(req.path)) return next();

    // console.log( "nonSecure ? ", nonSecurePaths.includes(req.path))

    const unAuthorized = (reason:number = 0) => {
        let message = reason ? "Token invalid." : "Missing authentication token.";
        return res.status(401).send({ err : true, message, tokenInvalid : Boolean(reason) })
    }

    const authorise = (payload:any) => {
        req.user = payload;
        return next()
    }

    const tokenVerification = (token:any) => {
        jwt.verify(token, loginJwtSecret, { complete: true }, (err:any, userInfo:any) => {
            return err ? unAuthorized(1) : authorise(userInfo.payload)
        });
    }

    const { token } = req.headers;
    return token ? tokenVerification(token) : unAuthorized(0);
  }

  const authenticateSupport = ( req:any, res:any, next:Function ) => {
    
    const unAuthorized = (reason:number = 0) => {
        let message = reason ? "Token invalid." : "Missing authentication support token.";
        return res.status(401).send({ err : true, message, tokenInvalid : Boolean(reason) })
    }

    const authorise = (payload:any) => {
        req.user = payload;
        return next();
    }

    const tokenVerification = (token:any) => {
        jwt.verify(token, supportJwtSecret, { complete: true }, (err:any, userInfo:any) => {
            return err ? unAuthorized(1) : authorise(userInfo.payload);
        });
    }
    
    const { supportToken } = req.headers;
    return supportToken ? tokenVerification(supportToken) : unAuthorized(0);
  }
export { authenticate, authenticateSupport };