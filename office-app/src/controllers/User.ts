import { NextFunction, Request, Response } from "express";
import bcryptjs from 'bcryptjs';
/** constant namespace to keep track of the login */
const NAMESPACE = "User";

/** protective route for testing to make sure that token we assign is working properly and user is authenticated properly*/
const validateToken = (req: Request, res: Response, next: NextFunction) =>{
    console.log(NAMESPACE, `token validated, user authorized`);

    return res.status(200).json({message: 'authorized'});
}

/** create a new user and store in the database */
const register = (req: Request, res: Response, next: NextFunction) =>{
    let {username, password} = req.body;

    //hashing to encrypt the passwords
    bcryptjs.hash(password, 10, (hashError, hash) => {
        if(hashError){
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        //TODO: Insert user into DB
    })
}

/** login the user and return that user */
const login = (req: Request, res: Response, next: NextFunction) =>{
    
}

/** return each user in the database and not showing the passwords */
const getAllUsers = (req: Request, res: Response, next: NextFunction) =>{
    
}

export default { validateToken, register, login, getAllUsers};