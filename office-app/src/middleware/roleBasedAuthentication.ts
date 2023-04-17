import { Request, Response, NextFunction } from "express";

export const UserAuthHandler = (role: String) => (req:Request, res: Response, next: NextFunction)=>{

    const user = res.locals.user;
    console.log(user);
    if(!user){
        return res.send("You need to login");
    }
    if(role === 'ADMIN' && user.role !== 'ADMIN'){
        return res.send('To perform this operation you have to be an ADMIN');
    }
    if(role === 'SUPER_ADMIN' && user.role !== 'SUPER_ADMIN'){
        return res.send('To perform this operation you have to be SUPER ADMIN');
    }
    
    next();
}
