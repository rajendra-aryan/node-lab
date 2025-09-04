import express from "express"
import db from "../db/index.js"
import { usersTable } from "../models/index.js"
import {signupPostReqBodySchema} from  "../validation/req.validation.js"
import { hashPasswordWithSalt } from "../utils/hash.js"
import { getUserByEmail , createUser} from "../services/user.services.js"

const router = express.Router()

router.get('/signup', async (req,res) =>{
    const validationResult = await signupPostReqBodySchema.safeParseAsync(req.body)

    if(validationResult.error){
        return res.status(400).json({error:validationResult.error.message})
    }

    const {firstName, lastName, email, password} = validationResult.data

    const existingUser = await getUserByEmail(email)
    if(!existingUser){
        return res.status(400).json({error:`User with email:${email} already exists`})
    }

    const {salt, password:hassedPassword} = hashPasswordWithSalt(password)

    const user = await createUser({email, firstName, lastName, salt, password:hassedPassword})

    return res.status(201).json({data:{userId:user.id}})
})


export default router