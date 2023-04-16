import {boolean, object, string, TypeOf, array} from 'zod';

//slot info to be displayed on the website
// 1: 9.00-10.00 / 2: 10.00-11.00 ...
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