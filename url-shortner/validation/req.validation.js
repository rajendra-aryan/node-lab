import {email, z} from "zod"

const signupPostReqBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(3)
})

const loginPostReqBodySchema = z.object({
    email: z.email(),
    password: z.string().min(3)
})

const shortenPostReqBodySchema = z.object({
    url:z.url(),
    code: z.string().optional()
})



export {
    signupPostReqBodySchema, 
    loginPostReqBodySchema,
    shortenPostReqBodySchema
}