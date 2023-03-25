import express from 'express';
import {createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler } from '../controllers/Organization';
import {SuperAdminAuthHandler, AdminAuthHandler} from "../controllers/User";
import validateResource from '../middleware/validateResources';
import { createOrganizationSchema, readOrganizationSchema, updateOrganizationSchema } from '../schemas/Organization';
const router = express.Router();


router.post('/create', AdminAuthHandler, validateResource(createOrganizationSchema), createOrganizationHandler);
router.get('/get/:id', validateResource(readOrganizationSchema), readOrganizationHandler);
router.get('/getAll', AdminAuthHandler, readAllOrganizationHandler);
router.post('/update/:id', AdminAuthHandler, validateResource(updateOrganizationSchema), updateOrganizationHandler );
router.delete('/delete/:id', AdminAuthHandler, deleteOrganizationHandler);

export = router;