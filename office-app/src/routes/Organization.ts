import express from 'express';
import {createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler } from '../controllers/Organization';
import {UserAuthHandler} from "../middleware/roleBasedAuthentication";
import validateResource from '../middleware/validateResources';
import { createOrganizationSchema, readOrganizationSchema, updateOrganizationSchema } from '../schemas/Organization';

const router = express.Router();


    /**
    * @openapi
    * '/api/organizations':
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

    router.post('/api/organizations', UserAuthHandler('SUPER_ADMIN'), validateResource(createOrganizationSchema), createOrganizationHandler);

    /**
    * @openapi 
    * '/api/organizations':
    *  get:
    *     tags:
    *     - Organization
    *     summary: Get all organizations
    *     description: Returns the all organizations in the database
    *     responses:
    *       200:
    *         description: Success
    */
    router.get('/api/organizations', UserAuthHandler('SUPER_ADMIN'), readAllOrganizationHandler);

    /**
    * @openapi  
    * '/api/organizations/{id}':
    *  get:
    *     tags:
    *     - Organization
    *     summary: Get an organization
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the organization
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schema/Organization'
    *       404:
    *         description: Organization not found
    */
    router.get('/api/organizations/:id', UserAuthHandler('SUPER_ADMIN'), validateResource(readOrganizationSchema), readOrganizationHandler);

    /**
    * @openapi
    * '/api/organizations/{id}':
    *  put:
    *     tags:
    *     - Organization
    *     summary: Update an organization
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the organization
    *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *           application/json:
    *               schema:
    *                   $ref: '#/components/schemas/UpdateOrganizationInput'
    *     responses:
    *       200:
    *         description: Organization is successfullt updated
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UpdateOrganizationResponse'
    *       404:
    *         description: Organization not found
    */
    router.put('/api/organizations/:id', UserAuthHandler('SUPER_ADMIN'), validateResource(updateOrganizationSchema), updateOrganizationHandler );

    /**
    * @openapi
    * '/api/organizations/{id}':
    *  delete:
    *     tags:
    *     - Organization
    *     summary: Delete an organization
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the organization
    *        required: true
    *     responses:
    *       200:
    *         description: Success! Organization is deleted
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/Organization'
    *       404:
    *         description: Organization not found
    */
router.delete('/api/organizations/:id', UserAuthHandler('SUPER_ADMIN'), deleteOrganizationHandler);

export default router