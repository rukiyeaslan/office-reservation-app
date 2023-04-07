import express from 'express';
import {createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler } from '../controllers/Organization';
import {SuperAdminAuthHandler, AdminAuthHandler} from "../controllers/User";
import validateResource from '../middleware/validateResources';
import { createOrganizationSchema, readOrganizationSchema, updateOrganizationSchema } from '../schemas/Organization';
const router = express.Router();


router.post('/create', SuperAdminAuthHandler, validateResource(createOrganizationSchema), createOrganizationHandler);
router.get('/get/:id', SuperAdminAuthHandler, validateResource(readOrganizationSchema), readOrganizationHandler);
router.get('/getAll', SuperAdminAuthHandler, readAllOrganizationHandler);
router.post('/update/:id', SuperAdminAuthHandler, validateResource(updateOrganizationSchema), updateOrganizationHandler );
router.delete('/delete/:id', SuperAdminAuthHandler, deleteOrganizationHandler);

export = router;