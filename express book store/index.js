import express from "express";
import { router as bookRouter}  from "./routes/book.routes.js";
import loggerMiddleware from "./middlewares/logger.js";
import "dotenv/config"
import {router as authorRouter} from "./routes/author.routes.js"

const app = express()
const port = 5000;

//Middlewares(Plugins)
app.use(express.json());
app.use(loggerMiddleware)

//Routes
app.use('/books', bookRouter)
app.use('/authors', authorRouter)

app.listen(port,() => console.log(`HTTP server is running on port: ${port}`)) 