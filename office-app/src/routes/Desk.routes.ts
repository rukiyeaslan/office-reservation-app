import express from 'express';
import controller from '../controllers/Desk';
import validateResource from '../middleware/validateResources';
import { createDeskSchema, deleteDeskSchema, readDeskSchema, reserveDeskSchema, updateDeskSchema } from '../schemas/Desk';

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
    * 
    * '/api/desks':
    *  get:
    *     tags:
    *     - Desk
    *     summary: Get all desks
    *     description: Returns the all desks in the database
    *     responses:
    *       200:
    *         description: App is up and running
    *  
    * '/api/desks/{id}':
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
    * 
    * '/api/desks/reserve/{id}':
    *  post:
    *     tags:
    *     - Desk
    *     summary: Reserve a desk by id
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
    *                   $ref: '#/components/schemas/ReserveDeskInput'
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/ReserveDeskResponse'
    *       404:
    *         description: Desk not found
    * 
    * '/api/desks/{id}':
    *  put:
    *     tags:
    *     - Desk
    *     summary: Update a desk by id
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

    * '/api/desks/{id}':
    *  delete:
    *     tags:
    *     - Desk
    *     summary: Delete a single desk by the id
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

router.post('/api/desks/', validateResource(createDeskSchema),controller.createDeskHandler);
router.get('/api/desks/:id', validateResource(readDeskSchema), controller.readDeskHandler);
router.get('/api/desks/', controller.readAllDeskHandler);
router.put('/api/desks/:id', validateResource(updateDeskSchema), controller.updateDeskHandler);
router.post('/reserve/:id', validateResource(reserveDeskSchema), controller.reserveDeskHandler);
router.delete('/api/desks/:id', validateResource(deleteDeskSchema), controller.deleteDeskHandler);

// module.exports = router;
export default router;