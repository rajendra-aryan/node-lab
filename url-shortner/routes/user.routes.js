import express from "express"
import {signupPostReqBodySchema, loginPostReqBodySchema} from  "../validation/req.validation.js"
import { hashPasswordWithSalt } from "../utils/hash.js"
import { getUserByEmail , createUser} from "../services/user.services.js"
import { createUserToken } from "../utils/token.js"


const router = express.Router()

router.post('/signup', async (req,res) =>{
    const validationResult = await signupPostReqBodySchema.safeParseAsync(req.body)

    if(validationResult.error){
        return res.status(400).json({error:validationResult.error.message})
    }

    const {firstName, lastName, email, password} = validationResult.data

    const existingUser = await getUserByEmail(email)
    if(existingUser){
        return res.status(400).json({error:`User with email:${email} already exists`})
    }

    const {salt, password:hassedPassword} = hashPasswordWithSalt(password)

    const user = await createUser({email, firstName, lastName, salt, password:hassedPassword})

    return res.status(201).json({data:{userId:user.id}})
})

router.post('/login', async(req, res)=>{
    const validationResult = await loginPostReqBodySchema.safeParseAsync(req.body)
    if(validationResult.error){
        return res.status(400).json({error:validationResult.error})
    }

    const {email, password} = validationResult.data

    const user = await getUserByEmail(email)
    if(!user){
        return res.status(404).json({error: `User with email: ${email} doesn't exists`})
    }

    const {password:hassedPassword} = hashPasswordWithSalt(password, user.salt)
    if(user.password !== hassedPassword){
        return res.status(400).json({error:`Invalid password`})
    }

    const token = await createUserToken({id:user.id})
    
    return res.json({token})
})


export default router