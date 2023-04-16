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
 *        - slots
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: string
 *        deskId:
 *          type: string
 *        slots:
 *          type: array
 *          default: ['1', '2']
 *    CreateReservationResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: array
 *        deskId:
 *          type: string 
 *        slots:
 *          type: array
 *          default: ['1', '2']
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    UpdateReservationInput:
 *      type: object
 *      required:
 *        - userId
 *        - officeId
 *        - deskId
 *        - slots
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: string
 *        deskId:
 *          type: string
 *        slots:
 *          type: array
 *          default: ['1', '2']
 *    UpdateReservationResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: array
 *        deskId:
 *          type: string 
 *        slots:
 *          type: array
 *          default: ['1', '2']
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
 *       - slots
 *      properties:
 *        userId:
 *          type: string
 *        officeId:
 *          type: string
 *        deskId:
 *          type: string
 *        slots:
 *          type: array

 */
export const createReservationSchema = object({
    body: object({
        userId: string({
            required_error: "User id is required"
        }),
        deskId: string({
            required_error: "Office id is required"
        }),
        officeId: string({
            required_error: "Office id is required"
        }),
        slots: array(string()),
    })
});

export const getReservationSchema = object({
    body: object({
        userId: string({
            required_error: "User id is required"
        }),
        deskId: string({
            required_error: "Office id is required"
        }),
        officeId: string({
            required_error: "Office id is required"
        }),
        slots: array(string()),
    })
});

export const getAvailableSlotsSchema = object({
    params: object({
        id: string(),
    }),
});


export const updateReservationSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        userId: string({
            required_error: "User id is required"
        }),
        deskId: string({
        }),
        officeId: string({
        }),
        slots: array(string()),
    })
});

export type CreateReservationInput = TypeOf<typeof createReservationSchema>['body'];
export type GetAvailableSlotsInput = TypeOf<typeof getAvailableSlotsSchema>['params'];
export type UpdateReservationInput = TypeOf<typeof updateReservationSchema>;


// TO BE CONTINUED...