import express from 'express';
import controller from '../controllers/Office';
import {AdminAuthHandler, SuperAdminAuthHandler} from "../controllers/User";
import validateResource from '../middleware/validateResources';
import { deleteOfficeSchema, readOfficeSchema, updateOfficeSchema } from '../schemas/Office';

const router = express.Router();

router.post('/create', AdminAuthHandler, controller.createOfficeHandler);
router.get('/get/:id', validateResource(readOfficeSchema), controller.readOfficeHandler);
router.get('/getAll', controller.readAllOfficeHandler);
router.post('/update/:id', AdminAuthHandler, validateResource(updateOfficeSchema), controller.updateOfficeHandler);
router.delete('/delete/:id', AdminAuthHandler, validateResource(deleteOfficeSchema), controller.deleteOfficeHandler);

export = router;