import express from "express";
import { createUserHandler } from "../controllers/User2";
import validateResource from "../middleware/validateResources";
import { createUserSchema } from "../schemas/User";

const router = express.Router();

router.post('/api/users', validateResource(createUserSchema), createUserHandler)
export default router;