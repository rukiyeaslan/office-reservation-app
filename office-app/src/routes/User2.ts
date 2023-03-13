import express from "express";
import { createUserHandler, verifyUserHandler } from "../controllers/User2";
import validateResource from "../middleware/validateResources";
import { createUserSchema, verifyUserSchema } from "../schemas/User";

const router = express.Router();

router.post('/register', validateResource(createUserSchema), createUserHandler)
router.post('/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);

export = router;