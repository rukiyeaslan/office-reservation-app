import express from "express";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler, resetPasswordHandler, getCurrentUserHandler } from "../controllers/User";
import {AdminAuthHandler} from "../controllers/User";
import validateResource from "../middleware/validateResources";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schemas/User";

const router = express.Router();

    /**
    * @openapi
    * '/api/users':
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
    router.post('/api/users', AdminAuthHandler, validateResource(createUserSchema), createUserHandler)

    /**
    * @openapi
    * '/api/{id}/{verificationCode}':
    *  post:
    *     tags:
    *     - User
    *     summary: Verify a user
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the user
    *        required: true
    *      - name: verificationCode
    *        in: path
    *        description: Verification code that is sent to the email
    *        required: true
    *     responses:
    *      200:
    *        description: User is registered
    */
    router.post('/api/users/:id/:verificationCode', AdminAuthHandler, validateResource(verifyUserSchema), verifyUserHandler);

    /**
    * @openapi
    * '/api/users/forgotPassword':
    *  post:
    *     tags:
    *     - User
    *     summary: Register a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/ForgotPasswordInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/ForgotPasswordResponse'
    *      409:
    *        description: Conflict
    *      400: 
    *        description: Bad request
    */
    router.post('/api/users/forgotPassword', AdminAuthHandler, validateResource(forgotPasswordSchema), forgotPasswordHandler);

    /**
    * @openapi
    * '/api/{id}/{passwordResetCode}':
    *  post:
    *     tags:
    *     - User
    *     summary: Verify a user
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the user
    *        required: true
    *      - name: passwordResetCode
    *        in: path
    *        description: Reset code that is sent to the email
    *        required: true
    *     responses:
    *      200:
    *        description: User is registered
    */
    router.post('/api/users/:id/:passwordResetCode', AdminAuthHandler, validateResource(resetPasswordSchema), resetPasswordHandler);

    /**
    * @openapi
    * /api/users/me:
    *  get:
    *     tags:
    *     - User
    *     summary: Get current user
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */
router.get('/api/users/me', getCurrentUserHandler);

export default router;