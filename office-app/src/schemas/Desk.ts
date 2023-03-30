import {boolean, object, string, date, TypeOf} from 'zod';

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
