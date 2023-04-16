import express from "express";
import { createSessionHandler } from "../controllers/Auth";
import validateResource from "../middleware/validateResources";
import { createSessionSchema} from "../schemas/Auth";

const router = express.Router();

/**
* @openapi
* '/api/sessions':
*  post:
*     tags:
*     - Session
*     summary: Login to the system
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateSessionInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateSessionResponse'
*      409:
*        description: Conflict
*      400: 
*        description: Bad request
*/
router.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);

export default router;