import { NextFunction, Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { User, UserModel } from "../models/User";
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
    let {username, password, role} = req.body;
    console.log(`user is here ${username} with passord ${password}`);
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
            password: hash,
            role
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

        bcryptjs.compare(password, users[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Password Mismatch'
                });
            } else if (result) {
                signJWT(users[0], (_error, token) => {
                    if (_error) {
                        return res.status(500).json({
                            message: _error.message, 
                            error: _error // unauthorized
                        });
                    } else if (token) {
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            user: users[0]
                        });
                    }
                });
            }
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    UserModel.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { validateToken, register, login, getAllUsers};