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
        role: string({
            required_error: "role is required"
        }),
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

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    }),
});


export const AuthAdminSchema = object({
    params: object({
        id: string()
    }),
    body: object({
        role: string({
            required_error: "role is required"
        })
    }).refine((data) => data.role === "ADMIN", {
        message: "To perform this operation, you must be an admin",
        path: ["admin authentication"],})
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

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type AuthAdminInput = TypeOf<typeof AuthAdminSchema>;
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;