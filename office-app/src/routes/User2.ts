import express from "express";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler } from "../controllers/User2";
import validateResource from "../middleware/validateResources";
import { createUserSchema, forgotPasswordSchema, verifyUserSchema } from "../schemas/User";

const router = express.Router();

router.post('/register', validateResource(createUserSchema), createUserHandler)
router.post('/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);
router.post('/forgotPassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);
export = router;