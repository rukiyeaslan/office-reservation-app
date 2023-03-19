import express from "express";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler, resetPasswordHandler, getCurrentUserHandler } from "../controllers/User2";
import validateResource from "../middleware/validateResources";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schemas/User";

const router = express.Router();

router.post('/register', validateResource(createUserSchema), createUserHandler)
router.post('/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);
router.post('/forgotPassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);
router.post('/resetPassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler);
router.get('/me', getCurrentUserHandler);
export = router;