import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''; //lily
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''; //lily2
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@officeapp.hqnmikq.mongodb.net/office?retryWrites=true&w=majority`
;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
