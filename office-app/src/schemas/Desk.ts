import {boolean, object, string, date, TypeOf} from 'zod';

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

export const verifyDeskSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    }),
});


export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "email is required"
        }).email("Not a valid email")
    })
});


export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string()
    }),
    body: object({
        password: string({
            required_error: "password is required"
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],})
});

export type CreateDeskInput = TypeOf<typeof createDeskSchema>['body'];
export type VerifyDeskInput = TypeOf<typeof verifyDeskSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;