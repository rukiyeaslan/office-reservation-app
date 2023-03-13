import {Request, Response} from "express";
import { CreateUserInput, VerifyUserInput } from "../schemas/User";
import { createUser, findUserById } from "../service/User2";
import sendEmail from "../utils/mailer";

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
}

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
}