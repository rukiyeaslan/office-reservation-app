import { NextFunction, Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { UserModel } from "../models/User";
import signJWT from "../functions/signJWT";
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
        /**create a user */
        const _user = new UserModel({
            username,
            password: hash
        })

        return _user.save()
                .then((user: any) =>{
                    return res.status(201).json({user});
                })
                .catch((error: { message: any; }) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    })
                }) 
    })
}

/** login the user and return that user */
const login = (req: Request, res: Response, next: NextFunction) =>{
    let {username, password} = req.body;
    UserModel.find({username})
    .exec()
    .then(users => {
        if(users.length != 1){
            return res.status(401).json({
                message: 'unauthorized'
            });
        }

        bcryptjs.compare(password, users[0].password, (error, result)=>{
            if(error){
                return res.status(401).json({
                    message: 'unauthorized'
                });
            }

            else if(result){  //user is logged in return a token
                signJWT(users[0], (_error, token)=>{
                    
                })
            }
        })
    })
    .catch()
}

/** return each user in the database and not showing the passwords */
const getAllUsers = (req: Request, res: Response, next: NextFunction) =>{
    
}

export default { validateToken, register, login, getAllUsers};