import express from 'express';
import {createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler } from '../controllers/Organization';
import {SuperAdminAuthHandler, AdminAuthHandler} from "../controllers/User";
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
    * 
    * '/api/organization':
    *  get:
    *     tags:
    *     - Organization
    *     summary: Get all organizations
    *     description: Returns the all organizations in the database
    *     responses:
    *       200:
    *         description: Success
    *  
    * '/api/organizations/{id}':
    *  get:
    *     tags:
    *     - Organization
    *     summary: Get a single organization by the id
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
    * 
    * '/api/organizations/{id}':
    *  put:
    *     tags:
    *     - Organization
    *     summary: Update a organization by id
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

    * '/api/organizations/{id}':
    *  delete:
    *     tags:
    *     - Organization
    *     summary: Delete a single organizationby the id
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
    *              $ref: '#/components/schema/Organization'
    *       404:
    *         description: Organization not found
    */
router.post('/api/organizations', SuperAdminAuthHandler, validateResource(createOrganizationSchema), createOrganizationHandler);
router.get('/api/organizations/:id', SuperAdminAuthHandler, validateResource(readOrganizationSchema), readOrganizationHandler);
router.get('/api/organizations', SuperAdminAuthHandler, readAllOrganizationHandler);
router.put('/api/organizations/:id', SuperAdminAuthHandler, validateResource(updateOrganizationSchema), updateOrganizationHandler );
router.delete('/api/organizations/:id', SuperAdminAuthHandler, deleteOrganizationHandler);

export default router