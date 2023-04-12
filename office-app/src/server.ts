import { config } from "./config/config";
import express from "express";
import http from 'http';
import mongoose from 'mongoose';
import deserializeUser from "./middleware/deserializeUser";
import swaggerDocs from "./utils/swagger";
import router from "./routes/routes";
// const router = require("./routes");
//TODO: test cron
import './cron'

const app = express();

/** Connect to mongo */
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(()=>{
    console.log('connected')
    StartServer()
})
.catch((error)=>{console.log(error)});  

/** Start if mongo connects*/
const StartServer = ()=>{
    app.use((req, res, next)=>{
        console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', ()=>{
            /** Log the response */
            console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json()); //I only want json requests
    app.use(deserializeUser);
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    app.use(router);   
    // router.use('/api/users', userRoutes);
    // router.use('/api/desks', deskRoutes);
    // router.use('/api/offices', officeRoutes);
    // router.use('/api/organizations', organizationRoutes);
    // router.use('/api/sessions', sessionRoutes);
    
    swaggerDocs(app, config.server.port);

  /**
   * @openapi
   * /api.check:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
    app.get('/api/check', (req, res, next)=>{
        res.status(200).json({messgae: 'pong'});
    });

    /** Error Handling */
    app.use((req, res, next)=>{
        const error = new Error('route not found');
        console.log(error);

        return res.status(404).json({message: error.message});
    })

    http.createServer(app).listen(config.server.port, ()=>{
        console.log(`server is running on port ${config.server.port}`);
    });
};
