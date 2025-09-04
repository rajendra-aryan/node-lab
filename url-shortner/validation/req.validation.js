import {email, z} from "zod"

const signupPostReqBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(3)
})

export {signupPostReqBodySchema}