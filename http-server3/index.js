import http from "http"
import fs from "fs";

const server = http.createServer(function(req,res){
    const method = req.method;
    const path = req.url;

    const log = `\n[${Date.now()}]: ${method} ${path}`;
    fs.appendFileSync('log.txt', log, 'utf-8')


    switch(method){
        case 'GET':
            switch(path){
                case "/":
                    return res.writeHead(200).end("Hello from the server")
        
                case "/contact-us":
                    return res.writeHead(200).end('Contact me at rajendraaryansahu0173@gmail.com')

                case "/tweet":
                    return res.writeHead(200).end('Tweet 1\nTweet 2\nTweet 3')
            }
        break

        case 'POST':
            switch(path){
                case "/tweet":
                    return res.writeHead(201).end('Your tweet was created')
                
            }

    }

    return res.writeHead(404).end("You're lost man")
    
})

server.listen(8000,console.log(`HTTP server is up and running on port 8000`))
