import z from "zod";

const userTokenSchema = z.object({
    id:z.string()
})

export {userTokenSchema}