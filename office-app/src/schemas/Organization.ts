import { object, string, TypeOf, array} from 'zod';
import { createOfficeSchema } from './Office';



/**
 * @openapi
 * components:
 *  schemas:
 *    CreaterganizationInput:
 *      type: object
 *      required:
 *        - name
 *        - offices
 *      properties:
 *        name:
 *          type: string
 *          default: organization1
 *        offices:
 *          type: array
 *          default: []
 *    CreateOrganizationResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        offices:
 *          type: array
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
  *    UpdaterganizationInput:
 *      type: object
 *      required:
 *        - name
 *        - offices
 *      properties:
 *        name:
 *          type: string
 *          default: desk1
 *        offices:
 *          type: array
 * 
 *    UpdateOrganizationResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        offices:
 *          type: array
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    Organization:
 *      type: object
 *      required:
 *       - name
 *       - offices
 *      properties:
 *        name:
 *          type: string
 *        offices:
 *          type: array
 */
export const createOrganizationSchema = object({
    body: object({
        name: string({
            required_error: "Organization name is required"
        }),
        offices: array(createOfficeSchema),
    })
});


export const readOrganizationSchema = object({
    params: object({
        id: string(),
    }),
});


export const updateOrganizationSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        name: string({
        }),
        offices: array(createOfficeSchema),

    })
});

export const deleteOrganizationSchema = object({
    params: object({
        id: string(),
    }),
});

export type CreateOrganizationInput = TypeOf<typeof createOrganizationSchema>['body'];
export type ReadOrganizationInput = TypeOf<typeof readOrganizationSchema>['params'];
export type UpdateOrganizationInput = TypeOf<typeof updateOrganizationSchema>;
export type DeleteOrganizationInput = TypeOf<typeof updateOrganizationSchema>['params'];