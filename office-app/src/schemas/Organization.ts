import { object, string, TypeOf, array} from 'zod';
import { createOfficeSchema } from './Office';

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