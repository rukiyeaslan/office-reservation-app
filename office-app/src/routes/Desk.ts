import express from 'express';
import controller from '../controllers/Desk';

const router = express.Router();

router.post('/create', controller.createDeskHandler);
router.get('/get/:deskId', controller.readDeskHandler);
router.get('/get', controller.readAllDeskHandler);
router.put('/update/:deskId', controller.updateDeskHandler);
router.delete('/delete/:deskId', controller.deleteDeskHandler);

export = router;