import { config } from "./config/config";
import express from "express";
import http from 'http';
import mongoose from 'mongoose';
import deskRoutes from './routes/Desk';
import officeRoutes from './routes/Office';
import organizationRoutes from './routes/Organization';
// import userRoutes from './routes/User';

import userRoutes from './routes/User2';
import sendEmail from "./utils/mailer";
// console.log('no error 1');
const router = express();
// console.log('no error 2');

/** Connect to mongo */
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(()=>{
    console.log('connected')
    StartServer()
})
.catch((error)=>{console.log(error)});  

/** Star if mongo connects*/
const StartServer = ()=>{
    router.use((req, res, next)=>{
        console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', ()=>{
            /** Log the response */
            console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    router.use(express.urlencoded({extended: true}));
    router.use(express.json()); //I only want json requests

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/desks', deskRoutes);
    router.use('/offices', officeRoutes);
    router.use('/organizations', organizationRoutes);
    router.use('/users', userRoutes);
    
    /** Healthcheck */
    router.get('/ping', (req, res, next)=>{
        res.status(200).json({messgae: 'pong'});
    
    });

    /** Error Handling */
    router.use((req, res, next)=>{
        const error = new Error('route not found');
        console.log(error);

        return res.status(404).json({message: error.message});
    })

    http.createServer(router).listen(config.server.port, ()=>{
        console.log(`server is running on port ${config.server.port}`);
    });
};
