/** takes a token checks if it's valid */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
const NAMESPACE = "Auth";


const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE, 'validating token');

    let token = req.headers.authorization?.split(' ')[1];   //one of the standards that a lot of APIs use 

    if(token){
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if(error){
                res.status(404).json({message: error.message, error});
            }
            else{
                //save decoded and pass that along
                res.locals.jwt = decoded;
                next();
            }
        })
    }
    else{
        return res.status(401).json({message: 'unauthorized'});
    }
}


export default extractJWT;