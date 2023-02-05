import jwt from "jsonwebtoken";
import {config} from "../config/config";
import UserModel from "../interfaces/User";


const signJWT = (user: UserModel, callback: (error: Error | null, token: string | null) => void): void =>{
    var timeSinchEPoch = new Date().getTime();
    var expirationTime = timeSinchEPoch + Number(config.server.token.expireTime) * 100000 //to get in miliseconds
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try{
        jwt.sign(
            {
                username: user.username,

            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if(error){
                    callback(error, null);
                }
                else if(token){
                    callback(null, token);  //token was taken properly
                }
            }
        )
    }catch(error){
        callback(error, null);
    }
}

export default signJWT