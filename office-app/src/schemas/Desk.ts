import {boolean, object, string, date, TypeOf, array} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateDeskInput:
 *      type: object
 *      required:
 *        - name
 *        - availableSlots
 *        - office
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        availableSlots:
 *          type: array
 *          default: ['1', '2', '3', '4', '5','6','7', '8']
 *        office:
 *          type: string
 *        organization:
 *          type: string
 *    CreateDeskResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        availableSlots:
 *          type: array
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
 *        - availableSlots
 *        - office
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        availableSlots:
 *          type: array
 *          default: ['1', '2', '3', '4', '5','6','7', '8']
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
 *        availableSlots:
 *          type: array
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
 *       - availableSlots
 *       - office
 *       - organization
 *      properties:
 *        name:
 *          type: string
 *        availableSlots:
 *          type: array
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
        // reserved: boolean(),
        availableSlots: array(string()),
        
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


export const updateDeskSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        name: string(),
        availableSlots: array(string()),
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