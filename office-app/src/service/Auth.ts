import { DocumentType } from "@typegoose/typegoose";
import { signJwt}  from "../utils/jwt";
import { privateFields, User } from "../models/User2";
import SessionModel from "../models/Session";
import {omit} from "lodash";

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
    const payload = omit(user.toJSON(), privateFields);

    const accessToken = signJwt(payload, "accessTokenPrivateKey");

    return accessToken;
}