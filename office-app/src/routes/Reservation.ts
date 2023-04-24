import express from 'express';
import controller from '../controllers/Reservation';
import validateResource from '../middleware/validateResources';
import {UserAuthHandler} from "../middleware/roleBasedAuthentication";
import { createReservationSchema, deleteReservationSchema, getReservationsSchema } from '../schemas/Reservation';

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
    * '/api/reservations/{day}/{office}':
    *  get:
    *     tags:
    *     - Reservation
    *     summary: Get free slots by the day
    *     parameters:
    *      - name: day
    *        in: path
    *        description: day
    *        required: true
    *      - name: office
    *        in: path
    *        description: office
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *       404:
    *         description: Reservation not found
    */
    router.get('/api/reservations/:day/:office', UserAuthHandler('USER'),  validateResource(getReservationsSchema), controller.getReservationsHandler);


    /**
    * @openapi
    * '/api/reservations/{id}':
    *  delete:
    *     tags:
    *     - Reservation
    *     summary: Delete a single reservation by the id
    *     parameters:
    *      - name: id
    *        in: path
    *        description: The id of the reservation
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/Reservation'
    *       404:
    *         description: Reservation not found
    */
    router.delete('/api/desks/:id', UserAuthHandler('USER'), validateResource(deleteReservationSchema), controller.deleteReservationHandler);
export default router;