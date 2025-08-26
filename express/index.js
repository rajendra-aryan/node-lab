import express from "express";

const app = express();

app.get('/', function(req,res){
    res.end('Homepage')
})

app.get('/contact-us', function(req,res){
    res.end('You can contact me at my email')
})

app.get('/tweet', function(req,res){
    res.end('Tweet-1\nTweet-2\nTweet-3')
})

app.post('/tweets', function(req,res){
    res.status(201).end('Your tweet has been uploaded')
})

app.listen(8000,console.log(`Server is running on port 8000`))