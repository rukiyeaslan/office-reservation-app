import {object, string, TypeOf} from 'zod';


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - firstName
 *        - lastName
 *        - role
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: lily.reysan@catworld.com
 *        firstName:
 *          type: string
 *          default: Lily
 *        lastName:
 *          type: string
 *          default: Reysan
 *        role:
 *          type: string
 *          default: USER
 *        password:
 *          type: string
 *          default: lily123
 *        passwordConfirmation:
 *          type: string
 *          default: lily123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string 
 *        role:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 * 
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *    ForgotPasswordResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 */
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
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;