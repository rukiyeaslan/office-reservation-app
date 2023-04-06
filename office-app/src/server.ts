import { config } from "./config/config";
import express from "express";
import http from 'http';
import mongoose from 'mongoose';
import deskRoutes from './routes/Desk';
import officeRoutes from './routes/Office';
import organizationRoutes from './routes/Organization';
import sessionRoutes from './routes/Auth';
import userRoutes from './routes/User';
import deserializeUser from "./middleware/deserializeUser";
import swaggerDocs from "./utils/swagger";

const router = express();

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
    router.use(deserializeUser);
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
    /**
    * @openapi
    * '/api/users/register':
    *  post:
    *     tags:
    *     - User
    *     summary: Register a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateUserInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateUserResponse'
    *      409:
    *        description: Conflict
    *      400: 
    *        description: Bad request
    * 
    * /api/users/me:
    *  get:
    *     tags:
    *     - User
    *     summary: Get current user
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */

    router.use('/api/users', userRoutes);
    
        /**
    * @openapi
    * '/api/desks/create':
    *  post:
    *     tags:
    *     - Desk
    *     summary: Create a desk
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateDeskInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateDeskResponse'
    *      409:
    *        description: Conflict
    *      400: 
    *        description: Bad request
    * 
    * /api/desks/get:
    *  get:
    *     tags:
    *     - Desk
    *     summary: Get all desks
    *     description: Returns the all desks in the database
    *     responses:
    *       200:
    *         description: App is up and running
    *  
    * '/api/desks/get/{id}':
    *  get:
    *     tags:
    *     - Desk
    *     summary: Get a single desk by the id
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the desk
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schema/Desk'
    *       404:
    *         description: Desk not found
    */


    router.use('/api/desks', deskRoutes);
    
        /**
    * @openapi
    * '/api/offices/create':
    *  post:
    *     tags:
    *     - Office
    *     summary: Create an office
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateOfficeInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateOfficeResponse'
    *      409:
    *        description: Conflict
    *      400: 
    *        description: Bad request
    */
    router.use('/api/offices', officeRoutes);
    /**
    * @openapi
    * '/api/organizations/create':
    *  post:
    *     tags:
    *     - Organization
    *     summary: Create an organization
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateOrganizationInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateOrganizationResponse'
    *      409:
    *        description: Conflict
    *      400: 
    *        description: Bad request
    */
    router.use('/api/organizations', organizationRoutes);
    
    router.use('/api/sessions', sessionRoutes);
    
    swaggerDocs(router, config.server.port);

  /**
   * @openapi
   * /api/ping:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
    router.get('/api/ping', (req, res, next)=>{
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
