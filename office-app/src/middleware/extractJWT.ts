/** takes a token checks if it's valid */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE, 'validating token');

    let token = req.headers.authorization?.split(' ')[1]; //one of the standards that a lot of APIs use 

    if(token){

    }
}