import {NextFunction, Request, Response} from "express";
import { CreateUserInput, ForgotPasswordInput, VerifyUserInput, ResetPasswordInput } from "../schemas/User";
import { createUser, findUserById, findByEmail } from "../service/User";
import sendEmail from "../utils/mailer";
import {nanoid} from 'nanoid';
import UserModel from "../models/User";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response){
    const body = req.body;

    try{
        console.log(body.email);
        const user = await createUser(body);
        console.log("hi");
        await sendEmail({
            to: user.email,
            from: 'test@example.com',
            subject: "Please veify your account",
            text: `verification code ${user.verificationCode}. Id: ${user._id}`,

        });

        return res.send("User successfully created")

    }catch(e: any){
        if(e.code === 11000){
            return res.status(409).send("Account already exists!")
        }
        return res.status(500).send(e);
    }
};


export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response){
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    //find the user by id
    const user = await findUserById(id);

    if(!user){
        return res.send('Could not verify the user');
    }

    //check to see if they are already verified
    if(user.verified){
        return res.send('User is already verified');
    }

    //check to see if the verification code matches
    if(user.verificationCode === verificationCode){
        user.verified = true;

        await user.save();

        return res.send('user successfully verified');
    }

    return res.send('could not verify the user');
};

export async function AdminAuthHandler(req:Request, res: Response, next: NextFunction){
    
    const user = res.locals.user;
    const role = user.role;
    if(user.role !== 'ADMIN'){
        return res.send('To perfom this operation you should be an admin');
    }

    next();
}

export async function SuperAdminAuthHandler(req:Request, res: Response, next: NextFunction){
    
    const user = res.locals.user;
    const role = user.role;

    if(user.role !== 'SUPER_ADMIN'){
        return res.send('To perfom this operation you should be a super admin');
    }

    next();
}

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response){
    const message = "If a user with that email is registered, you will receive a password reset email";

    const {email} = req.body

    const user = await findByEmail(email);

    if(!user){
        console.log(`user with email ${email} does not exist`);
        return res.send(message);
    }

    if(!user.verified){
        return res.send("User is not verified");
    }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;
    await user.save();

    await sendEmail({
        to: user.email,
        from: "test@example.com",
        subject: "Reset your password for the office reservation app",
        text: `Password reset code: ${passwordResetCode}. Id: ${user.id}`
    });

    return res.send(message);
};

export async function resetPasswordHandler(req:Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response){
    const body = req.body;
    const {id, passwordResetCode} = req.params;
    const { password} = req.body;

    const user = await findUserById(id);

    if(!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode){
        return res.status(400).send('Could not reset the password');
    }

    user.passwordResetCode = null;
    user.password = password;
    await user.save();

    return res.send('successfully updated user password');
};


export async function getCurrentUserHandler(req: Request, res: Response){

    return res.send(res.locals.user);
};