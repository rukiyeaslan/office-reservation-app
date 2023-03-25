import {boolean, object, string, date, TypeOf, array} from 'zod';
import { createDeskSchema } from './Desk';
import { createOrganizationSchema } from './Organization';

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

export type CreateOfficeInput = TypeOf<typeof createOfficeSchema>['body'];
export type ReadOfficeInput = TypeOf<typeof readOfficeSchema>['params'];
export type UpdateOfficeInput = TypeOf<typeof updateOfficeSchema>;