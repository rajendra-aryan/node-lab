import express from "express";
import loggerMiddleware from "../middlewares/logger.js";
import {getAllBooks, getBookByID, createBook, deleteBook} from "../controllers/book.controller.js"

const router = express.Router()

router.get('/', getAllBooks)

router.get('/:id',loggerMiddleware, getBookByID)

router.post('/',createBook )

router.delete('/:id', deleteBook)



export {router}