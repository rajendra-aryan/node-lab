import http from "http"

const server = http.createServer(function(req,res){
    console.log(`Incoming request at [${Date.now()}]`);
    // console.log(req.headers);
    console.log(req.url);
    
    switch(req.url){
        case "/":
            res.writeHead(200);
            return res.end('Homepage')
        
        case "/contact-us":
            res.writeHead(200);
            return res.end(`Contact Me at rajendraaryansahu0173@gmail.com`)

        case "/about":
            res.writeHead(200);
            return res.end(`I am a human`)
        
        default:
            res.writeHead(404)
            return res.end("You're lost!!")
    }
    
    // res.writeHead(200)
    // res.end("OK!!")
})

server.listen(8000,()=>console.log(`Server is up and running on port 8000`));