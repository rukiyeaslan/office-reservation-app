import {boolean, object, string, TypeOf, array} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateReservationInput:
 *      type: object
 *      required:
 *        - userId
 *        - officeId
 *        - deskId
 *        - day
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: string
 *        deskId:
 *          type: string
 *        day:
 *          type: string
 *          default: 2023-04-17
 *    CreateReservationResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: array
 *        deskId:
 *          type: string 
 *        day:
 *          type: string
 *          default: 2023-04-17
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    Reservation:
 *      type: object
 *      required:
 *       - userId
 *       - officeId
 *       - deskId
 *       - day
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: string
 *        deskId:
 *          type: string
 *        day:
 *          type: string
 */


export const createReservationSchema = object({
    body: object({
        day: string({
            required_error: "day is required"
        }),
        userId: string({
            required_error: "User id is required"
        }),
        deskId: string({
            required_error: "Office id is required"
        }),
        officeId: string({
            required_error: "Office id is required"
        }),
        // slots: array(string()),
    })
});


export const readReservationSchema = object({
    params: object({
       day: string()
    })
});


export const getReservationsSchema = object({
    params: object({
        day: string(),
        office: string()
    }),
});


export const deleteReservationSchema = object({
    params: object({
        id: string(),
    }),
});


export type CreateReservationInput = TypeOf<typeof createReservationSchema>['body'];
export type GetReservationsInput = TypeOf<typeof getReservationsSchema>['params'];
export type ReadReservationInput = TypeOf<typeof readReservationSchema>['params'];
export type DeleteReservationInput = TypeOf<typeof deleteReservationSchema>['params'];


// TO BE CONTINUED...