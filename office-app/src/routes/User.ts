import express from "express";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler, resetPasswordHandler, getCurrentUserHandler } from "../controllers/User";
import {AdminAuthHandler} from "../controllers/User";
import validateResource from "../middleware/validateResources";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schemas/User";

const router = express.Router();

/**
* @openapi
* '/api/users/register':
*  post:
*     tags:
*     - User
*     summary: Register a user
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateUserInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateUserResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
*/
router.post('/register', AdminAuthHandler, validateResource(createUserSchema), createUserHandler)
router.post('/verify/:id/:verificationCode', AdminAuthHandler, validateResource(verifyUserSchema), verifyUserHandler);
router.post('/forgotPassword', AdminAuthHandler, validateResource(forgotPasswordSchema), forgotPasswordHandler);
router.post('/resetPassword/:id/:passwordResetCode', AdminAuthHandler, validateResource(resetPasswordSchema), resetPasswordHandler);
router.get('/me', getCurrentUserHandler);
export = router;