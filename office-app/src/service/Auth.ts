import { DocumentType } from "@typegoose/typegoose";
import { signJwt}  from "../utils/jwt";
import { User } from "../models/User2";
import SessionModel from "../models/Session";

export async function createSession({userId}: {userId: string}){
    return SessionModel.create({user: userId});
};


export async function signRefreshToken({userId}: {userId: string}){
    const session = await createSession({
        userId,
    });

    const refreshToken = signJwt(
        {
            session: session._id,
        },
        "refreshTokenPrivateKey"
    );

    return refreshToken;
};


export async function signAccessToken(user: DocumentType<User>){
    const payload = user.toJSON();

    const accessToken = signJwt(payload, "accessTokenPrivateKey");

    return accessToken;
}