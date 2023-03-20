import express from 'express';
import controller from '../controllers/Office';
import {SuperAdminAuthHandler} from "../controllers/User";

const router = express.Router();

router.post('/create', SuperAdminAuthHandler, controller.createOffice);
router.get('/get/:officeId', controller.readOffice);
router.get('/get', controller.readAllOffice);
router.put('/update/:officeId', SuperAdminAuthHandler, controller.updateOffice);
router.delete('/delete/:officeId', SuperAdminAuthHandler, controller.deleteOffice);

export = router;