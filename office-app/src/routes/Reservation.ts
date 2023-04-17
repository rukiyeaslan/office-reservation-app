import express from 'express';
import controller from '../controllers/Reservation';
import validateResource from '../middleware/validateResources';
import {UserAuthHandler} from "../middleware/roleBasedAuthentication";
import { createReservationSchema, getAvailableSlotsSchema, updateReservationSchema } from '../schemas/Reservation';

const router = express.Router();

    /**
    * @openapi
    * '/api/reservations':
    *  post:
    *     tags:
    *     - Reservation
    *     summary: Create a reservation
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateReservationInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateReservationResponse'
    *      409:
    *        description: Conflict
    *      400: 
    *        description: Bad request
    */ 
    router.post('/api/reservations/', UserAuthHandler('USER'), validateResource(createReservationSchema), controller.createReservationHandler);

    /**
    * @openapi  
    * '/api/reservations/{id}':
    *  get:
    *     tags:
    *     - Reservation
    *     summary: Get free slots by the id of the desk
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the desk
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *       404:
    *         description: Desk not found
    */
    router.get('/api/reservations/:id', UserAuthHandler('USER'),  validateResource(getAvailableSlotsSchema), controller.getAvailableSlotsHandler);


    /**
    * @openapi
    * '/api/reservations/{id}':
    *  put:
    *     tags:
    *     - Reservation
    *     summary: Update a reservation by id
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the reservation
    *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *           application/json:
    *               schema:
    *                   $ref: '#/components/schemas/UpdateReservationInput'
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UpdateReservationResponse'
    *       404:
    *         description: Reservation not found
    */
    router.put('/api/reservations/:id', UserAuthHandler('USER'), validateResource(updateReservationSchema), controller.updateReservationHandler);


export default router;