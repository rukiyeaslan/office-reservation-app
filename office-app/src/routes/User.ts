import express from 'express';
import controller from '../controllers/User';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/get/all', controller.getAllUsers);

export = router;
