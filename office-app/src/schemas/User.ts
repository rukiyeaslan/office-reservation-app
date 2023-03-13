import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "first name is required"
        }),
        lastName: string({
            required_error: "last name is required"
        }),
        password: string({
            required_error: "passord is required"
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: string({
            required_error: "passswordConfirmation is required"
        }),
        email: string({
            required_error: "email is required"
        }).email("Not a valid email"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    })
});

//using the schema above, export a typescript interface

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];