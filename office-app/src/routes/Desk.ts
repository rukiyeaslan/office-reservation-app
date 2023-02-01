import express from 'express';
import controller from '../controllers/Desk';

const router = express.Router();

router.post('/create', controller.createDesk);
router.get('/get/:deskId', controller.readDesk);
router.get('/get', controller.readAllDesk);
router.put('/update/:deskId', controller.updateDesk);
router.delete('/delete/:deskId', controller.deleteDesk);

export = router;