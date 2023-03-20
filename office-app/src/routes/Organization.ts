import express from 'express';
import controller from '../controllers/Organization';
import {SuperAdminAuthHandler, AdminAuthHandler} from "../controllers/User";
const router = express.Router();

router.post('/create', SuperAdminAuthHandler, controller.createOrganization);
router.get('/get/:organizationId', controller.readOrganization);
router.get('/get', AdminAuthHandler, controller.readAllOrganization);
router.put('/update/:organizationId', controller.updateOrganization);
router.delete('/delete/:organizationId', controller.deleteOrganization);

export = router;