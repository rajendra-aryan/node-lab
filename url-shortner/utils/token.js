import jwt from "jsonwebtoken"
import { userTokenSchema } from "../validation/token.validation.js"

const key = process.env.JWT_SECRET

async function createUserToken(payload) {
    const validationResult = await userTokenSchema.safeParseAsync(payload)
    if(validationResult.error){
        throw new Error(validationResult.error.message)
    }
    const payloadValidatedData = validationResult.data

    const token = jwt.sign(payloadValidatedData, key)
    
    return token
}

async function validateUserToken(token) {
    try {
        const payload = jwt.verify(token, key)
        return payload
    } catch (error) {
        return null
    }
}

export {createUserToken, validateUserToken}