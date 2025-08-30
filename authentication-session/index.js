import express from "express"
import userRouter from "./routes/user.routes.js" 

const app = express()
const PORT = process.env.PORT ?? 8000

app.get('/',(req, res)=>{
    res.json({message:"Everything is fine!"})
})

app.use('/user', userRouter)

app.listen(PORT, ()=>console.log(`Server is running on PORT:${PORT}`))