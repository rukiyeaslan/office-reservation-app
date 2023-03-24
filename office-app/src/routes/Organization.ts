import express from 'express';
import controller from '../controllers/Organization';
import {SuperAdminAuthHandler, AdminAuthHandler} from "../controllers/User";
const router = express.Router();

router.post('/create', AdminAuthHandler, controller.createOrganizationHandler);
router.get('/get/:organizationId', controller.readOrganizationHandler);
router.get('/get', AdminAuthHandler, controller.readAllOrganizationHandler);
router.put('/update/:organizationId', SuperAdminAuthHandler, controller.updateOrganizationHandler);
router.delete('/delete/:organizationId', SuperAdminAuthHandler, controller.deleteOrganizationHandler);

export = router;