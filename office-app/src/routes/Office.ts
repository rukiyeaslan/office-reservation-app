import express from 'express';
import controller from '../controllers/Office';
import {AdminAuthHandler, SuperAdminAuthHandler} from "../controllers/User";

const router = express.Router();

router.post('/create', AdminAuthHandler, controller.createOffice);
router.get('/get/:officeId', controller.readOffice);
router.get('/get', controller.readAllOffice);
router.put('/update/:officeId', SuperAdminAuthHandler, controller.updateOffice);
router.delete('/delete/:officeId', SuperAdminAuthHandler, controller.deleteOffice);

export = router;