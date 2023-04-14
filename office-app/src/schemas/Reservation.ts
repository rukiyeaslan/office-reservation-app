import {boolean, object, string, TypeOf, array} from 'zod';

//slot info to be displayed on the website
// 1: 9.00-10.00 / 2: 10.00-11.00 ...
export const creatReservationSchema = object({
    body: object({
        uderId: string({
            required_error: "User id is required"
        }),
        officeId: string({
            required_error: "Office id is required"
        }),

        // slots: array(),
    })
});

// TO BE CONTINUED...