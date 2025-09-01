import express from "express"
import db from "../db/index.js"
import { usersTable, userSession } from "../db/schema.js"
import { eq } from "drizzle-orm"
import {randomBytes, createHmac} from "crypto"
import jwt from "jsonwebtoken"
import { ensureAuthenticated } from "../middlewares/auth.middleware.js"


const router = express.Router()

router.patch('/',ensureAuthenticated,  async(req, res)=>{
    const {name} = req.body
    await db.update(usersTable).set({name}).where(eq(usersTable.id, user.id))

    return res.json({status:'success'})
})

router.get('/',ensureAuthenticated, async(req, res)=>{
    return res.json({user})
})

router.post('/signup', async (req, res)=> {
    const {name, email, password} = req.body

    const [existingUser] = await db
    .select({
        email: usersTable.email
    })
    .from(usersTable)
    .where(table=>eq(table.email, email))

    if(existingUser){
        return res.status(400).end({error:`User with email:${email} already exists`})
    }

    const salt = randomBytes(256).toString('hex')
    const hassedPassword = createHmac('sha256', salt).update(password).digest('hex')

    const [user] = await db.insert(usersTable).values({
        name,
        email,
        password:hassedPassword,
        salt
    }).returning({id:usersTable.id})

    return res.status(201).json({status:'success', data:{userId: user.id}})
})

router.post('/login', async (req, res)=>{
    const {name, email, password} = req.body

    const [existingUser] = await db
    .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        salt: usersTable.salt,
        role: usersTable.role,
        password: usersTable.password
    })
    .from(usersTable)
    .where(table=>eq(table.email, email))

    if(!existingUser){
        return res.status(404).end({error:`User with email:${email} doesn't exists`})
    } 

    const salt = existingUser.salt
    const existingHash = existingUser.password

    const newHash = createHmac('sha256', salt).update(password).digest('hex') 

    if(newHash !== existingHash){
        return res.status(400).json({error:`Incorrect password`})
    }

    const payload = {
        id: existingUser.id,
        name : existingUser.name,
        email : existingUser.email,
        role: existingUser.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1m"})

    return res.json({status:"success", token})
})


export default router