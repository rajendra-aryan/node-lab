import express from "express"
import userRouter from "./routes/user.routes.js" 
import db from "./db/index.js"
import { userSession, usersTable } from "./db/schema.js"
import { eq } from "drizzle-orm"


const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(async function name(req, res, next) {
    const sessionId = req.headers['session-id']
    if(!sessionId){
        return next()
    }

    const [data] = await db.select({
        sessionId: userSession.id,
        id: usersTable.id,
        userId: userSession.userId,
        name: usersTable.name,
        email: usersTable.email
    })
    .from(userSession)
    .rightJoin(usersTable,eq(usersTable.id, userSession.userId))
    .where(table=>eq(table.sessionId, sessionId))
    if(!data){
        return next()
    }

    req.user = data
    next()
})

app.get('/',(req, res)=>{
    res.json({message:"Everything is fine!"})
})

app.use('/user', userRouter)

app.listen(PORT, ()=>console.log(`Server is running on PORT:${PORT}`))