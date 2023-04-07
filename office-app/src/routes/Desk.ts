import express from 'express';
import controller from '../controllers/Desk';
import validateResource from '../middleware/validateResources';
import { createDeskSchema, deleteDeskSchema, readDeskSchema, updateDeskSchema } from '../schemas/Desk';

const router = express.Router();

router.post('/create', validateResource(createDeskSchema),controller.createDeskHandler);
router.get('/get/:id', validateResource(readDeskSchema), controller.readDeskHandler);
router.get('/getAll', controller.readAllDeskHandler);
router.post('/update/:id', validateResource(updateDeskSchema), controller.updateDeskHandler);
router.delete('/delete/:id', validateResource(deleteDeskSchema), controller.deleteDeskHandler);

export = router;