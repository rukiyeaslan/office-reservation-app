import {object, string, TypeOf} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 */

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "email is required"
        }).email(),
        password: string({
            required_error: "password is required"
        }).min(6, "invalid email or password")
    })
});


export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];