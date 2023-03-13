import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''; //lily
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''; //lily2
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@officeapp.hqnmikq.mongodb.net/office?retryWrites=true&w=majority`
;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        token: {
            expireTime: SERVER_TOKEN_EXPIRETIME,
            issuer: SERVER_TOKEN_ISSUER,
            secret: SERVER_TOKEN_SECRET
        }
    },
    smtp:{
        user: 'r56neg7zumgk5e3w@ethereal.email',
        pass: 'k4ZXRxsZzPucDeqSV2',
        host: 'smtp.ethereal.email', 
        port: 587, 
        secure: false 
    }
};
