import fs from "fs"


function loggerMiddleware(req,res,next){
    const log = `\n[${Date.now()}] ${req.method} ${req.body}`
    fs.appendFileSync('log.txt', log, 'utf-8');
    next()
}


export default loggerMiddleware