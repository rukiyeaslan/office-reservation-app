import express from "express";
import { createSessionHandler } from "../controllers/Auth";
import validateResource from "../middleware/validateResources";
import { createSessionSchema} from "../schemas/Auth";

const router = express.Router();

router.post('/login', validateResource(createSessionSchema), createSessionHandler)

export = router;