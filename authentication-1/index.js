import express from "express"

const app = express()
const PORT = 6000

app.use(express.json())

const DIARY = {}
const EMAILS = new Set()

app.post('/signup', (req, res)=>{
    const {name, email, password} = req.body
    if(EMAILS.has(email)){
        return res.status(400).end({message:"Email already taken"})
    }

    const token = `${Date.now()}`

    DIARY[token] = {name, email, password}
    EMAILS.add(email)

    return req.json({message: "sucess", token})
})

app.get('/me',(req, res)=>{
    const {token} = req.body
    if(!token){
        return res.json(400).end({message:"Missing Token"})
    }
    if(!(token in DIARY)){
        return res.json(400).end({message:"Invalid Token"})
    }
    
    const entry = DIARY[token]
    
    return res.json({data:entry})
})

app.post('/private-data', (req,res)=>{
    const {token} = req.body
    if(!token){
        return res.json(400).end({message:"Missing Token"})
    }
    if(!(token in DIARY)){
        return res.json(400).end({message:"Invalid Token"})
    }
    
    const entry = DIARY[token]
    
    return res.json({data:{privateData:"Access Granted"}})
})


app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))
