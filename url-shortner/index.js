import express from "express"
import userRouter from "./routes/user.routes.js"

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.get('/',async(req,res)=>{
    return res.json({status:"Everything's fine!"})
})

app.get('/user', userRouter)

app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`))