import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/Auth";
import { signAccessToken, signRefreshToken } from "../service/Auth";
import { findByEmail } from "../service/User";

export async function createSessionHandler(req: Request<{},{},CreateSessionInput>, res: Response){
    const message = "invalid email or password";
    const {email, password} = req.body;
    const user = await findByEmail(email);

    if(!user){
        return res.send(message);
    }

    if(!user.verified){
        return res.send("Please verify your email");
    }

    const isValid = await user.validatePassword(password);

    if(!isValid){
        return res.send(message);
    }

    //sign an access token
    const accessToken = await signAccessToken(user);
    
    //sign a refresh token
    const refreshToken = await signRefreshToken({userId: user._id});

    //send the tokens
    return res.send({
        accessToken,
        refreshToken,
    })

}