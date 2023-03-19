import express from 'express';
import controller from '../controllers/Organization';
import {AdminAuthHandler} from "../controllers/User2";
const router = express.Router();

router.post('/create', controller.createOrganization);
router.get('/get/:organizationId', controller.readOrganization);
router.get('/get', AdminAuthHandler, controller.readAllOrganization);
router.put('/update/:organizationId', controller.updateOrganization);
router.delete('/delete/:organizationId', controller.deleteOrganization);

export = router;