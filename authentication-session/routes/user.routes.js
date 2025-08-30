import express from "express"
import db from "../db/index.js"
import { usersTable, userSession } from "../db/schema.js"
import { eq } from "drizzle-orm"
import {randomBytes, createHmac} from "crypto"

const router = express.Router()

router.get('/', async(req, res)=>{
    const sessionId = req.headers['session-id']
    
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
        email: usersTable.email,
        salt: usersTable.salt,
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

    const [session] = await db.insert(userSession).values({
        userId: existingUser.id
    }).returning({ id: userSession.id})
    return res.json({status:"success", sessionId:session.id})
})


export default router