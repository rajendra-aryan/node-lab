import express from "express";

const app = express()
const port = 5000;

//In memory DB
const books= [
    { id: 1 , title: "Book One", author: "Author One" },
    { id: 2 , title: "Book Two", author: "Author Two" },
    { id: 3 , title: "Book Three", author: "Author Three" }
];


function customMiddleware(req,res,next){
    console.log("I am a middleware");
    next();
}

//Middlewares(Plugins)
app.use(express.json());

app.use(customMiddleware)

// app.use((req,res,next)=>{
//     console.log("I am also an middleware");
//     next()
// })


//Routes
app.get('/books', (req, res)=>{
    // res.setHeader('x-aryan', "Rajendra")
    res.json(books)
})

app.get('/books/:id',customMiddleware, (req,res)=>{
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({error: `ID must be of type number`})
    }

    const book = books.find((e)=>e.id===id) // Select * from books where id = {id}

    if(!book){
        return res
        .status(404)
        .json({error: `Book with id: ${id} doesn't exists!`}) 
    }

    return res.json(book)
})

app.post('/books', (req,res)=>{
    // console.log(req.headers)
    // console.log(req.body)
    const {title,author} =  req.body;
    if(!title || title==='') return res.status(400).json({error: `title is required`})
    if(!author || author==='') return res.status(400).json({error: `author is required`})
    
    const id = books.length + 1;
    const book = {id, title, author}
    books.push(book)

    return res.status(201).json({message: `Book created success`, id})
})

app.delete('/books/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    if(isNaN(id)){
        return res.status(400).json({error: `ID must be of type number`})
    }

    const index = books.findIndex(e => e.id===id)
    if(index<0) 
        return res
        .status(404)
        .json({error: `Book with id:${id} doesn't exists`})

    books.splice(index,1);
    return res.status(200).json({message: `Book deleted`})
})



app.listen(port,() => console.log(`HTTP server is running on port: ${port}`)) 