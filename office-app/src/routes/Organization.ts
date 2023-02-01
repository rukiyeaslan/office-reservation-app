import express from 'express';
import controller from '../controllers/Organization';

const router = express.Router();

router.post('/create', controller.createOrganization);
router.get('/get/:organizationId', controller.readOrganization);
router.get('/get', controller.readAllOrganization);
router.put('/update/:organizationId', controller.updateOrganization);
router.delete('/delete/:organizationId', controller.deleteOrganization);

export = router;