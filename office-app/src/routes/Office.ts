import express from 'express';
import controller from '../controllers/Office';
import {AdminAuthHandler, SuperAdminAuthHandler} from "../controllers/User";
import validateResource from '../middleware/validateResources';
import { deleteOfficeSchema, readOfficeSchema, updateOfficeSchema } from '../schemas/Office';

const router = express.Router();

router.post('/create', SuperAdminAuthHandler, controller.createOfficeHandler);
router.get('/get/:id', SuperAdminAuthHandler, validateResource(readOfficeSchema), controller.readOfficeHandler);
router.get('/getAll', SuperAdminAuthHandler, controller.readAllOfficeHandler);
router.post('/update/:id', SuperAdminAuthHandler, validateResource(updateOfficeSchema), controller.updateOfficeHandler);
router.delete('/delete/:id', SuperAdminAuthHandler, validateResource(deleteOfficeSchema), controller.deleteOfficeHandler);

export = router;