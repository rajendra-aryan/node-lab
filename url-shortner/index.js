import express from "express"
import userRouter from "./routes/user.routes.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"
import urlRouter from "./routes/url.routes.js"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(authMiddleware)

app.get('/',async(req,res)=>{
    return res.json({status:"Everything's fine!"})
})

app.get('/user', userRouter)
app.get(userRouter)

app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`))