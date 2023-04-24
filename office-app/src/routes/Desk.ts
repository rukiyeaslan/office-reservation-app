import express from 'express';
import controller from '../controllers/Desk';
import validateResource from '../middleware/validateResources';
import { UserAuthHandler } from '../middleware/roleBasedAuthentication';
import { createDeskSchema, deleteDeskSchema, readDeskSchema, updateDeskSchema } from '../schemas/Desk';

const router = express.Router();

    /**
    * @openapi
    * '/api/desks':
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
    */ 
    router.post('/api/desks/', UserAuthHandler('USER'), validateResource(createDeskSchema),controller.createDeskHandler);

    /**
    * @openapi
    * '/api/desks':
    *  get:
    *     tags:
    *     - Desk
    *     summary: Get all desks
    *     description: Returns the all desks in the database
    *     responses:
    *       200:
    *         description: App is up and running
    */
    router.get('/api/desks/', UserAuthHandler('USER'), controller.readAllDeskHandler);    

    /**
    * @openapi  
    * '/api/desks/{id}':
    *  get:
    *     tags:
    *     - Desk
    *     summary: Get a single desk
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
    router.get('/api/desks/:id', UserAuthHandler('USER'), validateResource(readDeskSchema), controller.readDeskHandler);



    /**
    * @openapi
    * '/api/desks/{id}':
    *  put:
    *     tags:
    *     - Desk
    *     summary: Update a desk
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the desk
    *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *           application/json:
    *               schema:
    *                   $ref: '#/components/schemas/UpdateDeskInput'
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UpdateDeskResponse'
    *       404:
    *         description: Desk not found
    */
    router.put('/api/desks/:id', UserAuthHandler('USER'), validateResource(updateDeskSchema), controller.updateDeskHandler);

    /**
    * @openapi
    * '/api/desks/{id}':
    *  delete:
    *     tags:
    *     - Desk
    *     summary: Delete a desk
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
    *              $ref: '#/components/schemas/Desk'
    *       404:
    *         description: Desk not found
    */
    router.delete('/api/desks/:id', UserAuthHandler('USER'), validateResource(deleteDeskSchema), controller.deleteDeskHandler);

export default router;