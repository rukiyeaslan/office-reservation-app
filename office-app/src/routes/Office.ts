import express from 'express';
import controller from '../controllers/Office';
import {AdminAuthHandler, SuperAdminAuthHandler} from "../controllers/User";
import validateResource from '../middleware/validateResources';
import { deleteOfficeSchema, readOfficeSchema, updateOfficeSchema } from '../schemas/Office';

const router = express.Router();

    /**
    * @openapi
    * '/api/offices':
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
    router.post('/api/offices', SuperAdminAuthHandler, controller.createOfficeHandler);
  
    /**
    * @openapi
    * '/api/offices':
    *  get:
    *     tags:
    *     - Office
    *     summary: Get all offices
    *     description: Returns the all offices in the database
    *     responses:
    *       200:
    *         description: Success
    */
    router.get('/api/offices', SuperAdminAuthHandler, controller.readAllOfficeHandler);

    /**
    * @openapi
    * '/api/offices/{id}':
    *  get:
    *     tags:
    *     - Office
    *     summary: Get a single office by the id
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the office
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schema/Office'
    *       404:
    *         description: Office not found
    */
    router.get('/api/offices/:id', SuperAdminAuthHandler, validateResource(readOfficeSchema), controller.readOfficeHandler);

    /**
    * @openapi
    * '/api/offices/{id}':
    *  put:
    *     tags:
    *     - Office
    *     summary: Update a office by id
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the office
    *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *           application/json:
    *               schema:
    *                   $ref: '#/components/schemas/UpdateOfficeInput'
    *     responses:
    *       200:
    *         description: Office is successfullt updated
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UpdateOfficeResponse'
    *       404:
    *         description: Office not found
    */
    router.put('/api/offices/:id', SuperAdminAuthHandler, validateResource(updateOfficeSchema), controller.updateOfficeHandler);

    /**
    * @openapi
    * '/api/offices/{id}':
    *  delete:
    *     tags:
    *     - Office
    *     summary: Delete a single office by the id
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the office
    *        required: true
    *     responses:
    *       200:
    *         description: Success! Office is deleted
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schema/Office'
    *       404:
    *         description: Office not found
    */
router.delete('/api/offices/:id', SuperAdminAuthHandler, validateResource(deleteOfficeSchema), controller.deleteOfficeHandler);

export default router;