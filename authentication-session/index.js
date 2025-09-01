import express from "express"
import userRouter from "./routes/user.routes.js" 
import adminRouter from "./routes/admin.routes.js"
import db from "./db/index.js"
import { userSession, usersTable } from "./db/schema.js"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"
import { authenticationMiddleware } from "./middlewares/auth.middleware.js"


const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.use(authenticationMiddleware)

app.get('/',(req, res)=>{
    res.json({message:"Everything is fine!"})
})

app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.listen(PORT, ()=>console.log(`Server is running on PORT:${PORT}`))