import {boolean, object, string, date, TypeOf} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateDeskInput:
 *      type: object
 *      required:
 *        - name
 *        - reserved
 *        - office
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        reserved:
 *          type: boolean
 *          default: false
 *        office:
 *          type: string
 *        organization:
 *          type: string
 *    CreateDeskResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        reserved:
 *          type: boolean
 *        office:
 *          type: string 
 *        organization:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    UpdateDeskInput:
 *      type: object
 *      required:
 *        - name
 *        - reserved
 *        - office
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        reserved:
 *          type: boolean
 *          default: false
 *        office:
 *          type: string
 *        organization:
 *          type: string
 * 
 *    UpdateDeskResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        reserved:
 *          type: boolean
 *        office:
 *          type: string 
 *        organization:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    ReserveDeskInput:
 *      type: object
 *      required:
 *        - name
 *        - reserved
 *        - office
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        reserved:
 *          type: boolean
 *          default: false
 *        office:
 *          type: string
 *        organization:
 *          type: string
 * 
 *    ReserveDeskResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        reserved:
 *          type: boolean
 *        office:
 *          type: string 
 *        organization:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    Desk:
 *      type: object
 *      required:
 *       - name
 *       - reserved
 *       - office
 *       - organization
 *      properties:
 *        name:
 *          type: string
 *        reserved:
 *          type: boolean
 *        office:
 *          type: number
 *        organization:
 *          type: string
 */

export const createDeskSchema = object({
    body: object({
        name: string({
            required_error: "Desk name is required"
        }),
        reserved: boolean(),
        // reservationStartTime: date() || null,
        // reservationEndTime: date() || null,
        office: string({
            required_error: "Office id is required"
        }),
        organization: string({
            required_error: "Organization id is required"
        }),
    })
});

export const readDeskSchema = object({
    params: object({
        id: string(),
    }),
});


export const reserveDeskSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        reserved: boolean(),
        reservationStartTime: date(),
        reservationEndTime: date(),

    })
});


export const updateDeskSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        name: string(),
        reserved: boolean(),
        // reservationStartTime: date(),
        // reservationEndTime: date(),
        office: string(),
        organization: string(),
    })
});


export const deleteDeskSchema = object({
    params: object({
        id: string(),
    }),
});


export type CreateDeskInput = TypeOf<typeof createDeskSchema>['body'];
export type ReadDeskInput = TypeOf<typeof readDeskSchema>['params'];
export type UpdateDeskInput = TypeOf<typeof updateDeskSchema>;
export type DeleteDeskInput = TypeOf<typeof deleteDeskSchema>['params'];
export type ReserveDeskInput = TypeOf<typeof reserveDeskSchema>;
