import express from 'express';
import controller from '../controllers/Office';
import {UserAuthHandler} from "../middleware/roleBasedAuthentication";
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
    router.post('/api/offices', UserAuthHandler('SUPER_ADMIN'), controller.createOfficeHandler);
  
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
    router.get('/api/offices', UserAuthHandler('SUPER_ADMIN'), controller.readAllOfficeHandler);

    /**
    * @openapi
    * '/api/offices/{id}':
    *  get:
    *     tags:
    *     - Office
    *     summary: Get an office
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
    router.get('/api/offices/:id', UserAuthHandler('SUPER_ADMIN'), validateResource(readOfficeSchema), controller.readOfficeHandler);

    /**
    * @openapi
    * '/api/offices/{id}':
    *  put:
    *     tags:
    *     - Office
    *     summary: Update an office
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
    *         description: Office is successfully updated
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UpdateOfficeResponse'
    *       404:
    *         description: Office not found
    */
    router.put('/api/offices/:id', UserAuthHandler('SUPER_ADMIN'), validateResource(updateOfficeSchema), controller.updateOfficeHandler);

    /**
    * @openapi
    * '/api/offices/{id}':
    *  delete:
    *     tags:
    *     - Office
    *     summary: Delete an office
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
    *              $ref: '#/components/schemas/Office'
    *       404:
    *         description: Office not found
    */
router.delete('/api/offices/:id', UserAuthHandler('SUPER_ADMIN'), validateResource(deleteOfficeSchema), controller.deleteOfficeHandler);

export default router;