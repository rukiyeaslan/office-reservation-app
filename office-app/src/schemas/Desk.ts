import { Ref } from '@typegoose/typegoose';
import {boolean, object, string, date, TypeOf} from 'zod';
import Office from '../models/Office';

export const createDeskSchema = object({
    body: object({
        name: string({
            required_error: "name is required"
        }),
        reserved: boolean({

        }),
        reservationStartTime: date(),
        reservationEndTime: date(),
        office: string(),
        organization: string(),
    })
});

export const readDeskSchema = object({
    params: object({
        id: string(),
    }),
});


export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "email is required"
        }).email("Not a valid email")
    })
});


export const updateDeskSchema = object({
    params: object({
        id: string(),
    }),
    body: object({
        name: string({
            required_error: "name is required"
        }),
        reserved: boolean({

        }),
        reservationStartTime: date(),
        reservationEndTime: date(),
        office: string(),
        organization: string(),
    })
});

export type CreateDeskInput = TypeOf<typeof createDeskSchema>['body'];
export type ReadDeskInput = TypeOf<typeof readDeskSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type UpdateDeskInput = TypeOf<typeof updateDeskSchema>;