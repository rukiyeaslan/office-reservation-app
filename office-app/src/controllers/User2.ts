import {Request, Response} from "express";
import { CreateUserInput } from "../schemas/User";
import { createUser } from "../service/User2";
import sendEmail from "../utils/mailer";
export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response){
    const body = req.body

    try{
        const user = await createUser(body);
        await sendEmail({
            from: 'test@example.com',
            to: user.email,
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