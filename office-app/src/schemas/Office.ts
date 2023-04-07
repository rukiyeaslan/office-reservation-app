import {boolean, object, string, date, TypeOf, array} from 'zod';
import { createDeskSchema } from './Desk';


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateOfficeInput:
 *      type: object
 *      required:
 *        - name
 *        - desks
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: office1
 *        desks:
 *          type: array
 *          default: []
 *        organization:
 *          type: string
 *    CreateDeskResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        desks:
 *          type: array
 *        organization:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    UpdateOfficeInput:
 *      type: object
 *      required:
 *        - name
 *        - office
 *        - organization
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        desks:
 *          type: array
 *        organization:
 *          type: string
 * 
 *    UpdateOfficeResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        desks:
 *          type: array
 *        organization:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    Office:
 *      type: object
 *      required:
 *       - name
 *       - desks
 *       - organization
 *      properties:
 *        name:
 *          type: string
 *        desks:
 *          type: array
 *        organization:
 *          type: string
 */
export const createOfficeSchema = object({
    body: object({
        name: string({
            required_error: "Office name is required"
        }),
        desks: array(createDeskSchema),
        organization: string(),
    })
});


export const readOfficeSchema = object({
    params: object({
        id: string(),
    }),
});


export const updateOfficeSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        name: string(),
        desks: array(createDeskSchema),
        organization: string(),

    })
});


export const deleteOfficeSchema = object({
    params: object({
        id: string(),
    }),
});

export type CreateOfficeInput = TypeOf<typeof createOfficeSchema>['body'];
export type ReadOfficeInput = TypeOf<typeof readOfficeSchema>['params'];
export type UpdateOfficeInput = TypeOf<typeof updateOfficeSchema>;
export type DeleteOfficeInput = TypeOf<typeof deleteOfficeSchema>['params'];
