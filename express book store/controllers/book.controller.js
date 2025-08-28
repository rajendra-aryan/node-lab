import {booksTable} from "../models/book.model.js";
import { authorsTable } from "../models/author.model.js";
import db from "../db/index.js";
import { eq, sql } from "drizzle-orm";


const getAllBooks = async function(req, res){
    const search = req.query.search;

    if(search){
        const book = await db
        .select()
        .from(booksTable)
        .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
        return res.json(book)
    }
    // res.setHeader('x-aryan', "Rajendra")
    const books = await db.select().from(booksTable)
    return res.json(books)
}

const getBookByID = async function(req,res){
    const id = req.params.id;

    const [book] = await db
    .select()
    .from(booksTable)
    .where(table=>eq(table.id,id))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1)

    if(!book){
        return res
        .status(404)
        .json({error: `Book with id: ${id} doesn't exists!`}) 
    }

    return res.json(book)
}

const createBook = async function(req,res){
    // console.log(req.headers)
    // console.log(req.body)
    const {title,authorId, description} =  req.body;
    if(!title || title==='') return res.status(400).json({error: `title is required`})
    
    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description
    }).returning({
        id:booksTable.id
    })

    return res.status(201).json({message: `Book created success`, id:result.id})
}

const deleteBook = async function(req,res){
    const id = req.params.id

    await db.delete(booksTable).where(eq(booksTable.id,id))


    return res.status(200).json({message: `Book deleted`})
}



export {getAllBooks, getBookByID, createBook, deleteBook}