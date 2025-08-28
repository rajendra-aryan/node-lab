import express, { Router } from "express"
import { authorsTable } from "../models/author.model.js"
import db from "../db/index.js"
import { eq } from "drizzle-orm"
import {booksTable} from "../models/book.model.js"


const router = express.Router()

router.get('/', async (req,res)=>{    
    const authors = await db.select().from(authorsTable)
    return res.json(authors)
})

router.get('/:id', async(req, res)=>{
    const [authors] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, req.params.id))
    return res.json(authors)

    if(!authors){
        res.status(404).json({error:`Author with ID ${req.params.id} doesn't exists`})
    }
})

router.post('/', async(req,res)=>{
    const {firstName, lastName, email } =req.body

    const [result] = await db.insert(authorsTable).values({
        firstName, 
        lastName,
        email   
    }).returning({id: authorsTable.id})
    return res.status(201).json({message:`Author has been created`, id: result.id})
})

router.get('/:id/books', async(req,res)=>{
    const books  = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, req.params.id));
    return res.json(books)
})

router.delete('/:id', async(req,res)=>{
    const authorId = req.params.id

    const deleted = await db
    .delete(authorsTable)
    .where(eq(authorsTable.id, authorId))

    if (deleted.length === 0) {
        return res.status(404).json({ error: `Author with ID ${authorId} doesn't exist` });
    }

    return res.json({ message: `Author and all their books deleted successfully` });
})


export {router}