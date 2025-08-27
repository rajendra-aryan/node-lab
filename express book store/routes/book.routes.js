import express from "express";
import {books} from "../db/config.js";
import loggerMiddleware from "../middlewares/logger.js";


const router = express.Router()

router.get('/', (req, res)=>{
    // res.setHeader('x-aryan', "Rajendra")
    res.json(books)
})

router.get('/:id',loggerMiddleware, (req,res)=>{
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

router.post('/', (req,res)=>{
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

router.delete('/:id', (req,res)=>{
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



export default router