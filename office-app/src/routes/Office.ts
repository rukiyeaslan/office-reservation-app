import express from 'express';
import controller from '../controllers/Office';
import {SuperAdminAuthHandler} from "../controllers/User2";
// import authAdmin from '../middleware/extractJWT'

const router = express.Router();

router.post('/create', SuperAdminAuthHandler, controller.createOffice);
router.get('/get/:officeId', controller.readOffice);
router.get('/get', controller.readAllOffice);
router.put('/update/:officeId', controller.updateOffice);
router.delete('/delete/:officeId', controller.deleteOffice);

export = router;