import express from 'express';
import {createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler } from '../controllers/Organization';
import {SuperAdminAuthHandler, AdminAuthHandler} from "../controllers/User";
import validateResource from '../middleware/validateResources';
import { createOrganizationSchema, readOrganizationSchema } from '../schemas/Organization';
const router = express.Router();


router.post('/create', AdminAuthHandler, validateResource(createOrganizationSchema), createOrganizationHandler);
router.get('/get/:organizationId', validateResource(readOrganizationSchema), readOrganizationHandler);
router.get('/get', AdminAuthHandler, readAllOrganizationHandler);
router.put('/update/:organizationId', SuperAdminAuthHandler, updateOrganizationHandler, );
router.delete('/delete/:organizationId', SuperAdminAuthHandler, deleteOrganizationHandler);

export = router;