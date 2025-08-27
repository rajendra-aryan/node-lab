import express from "express";
import router  from "./routes/book.routes.js";
import loggerMiddleware from "./middlewares/logger.js";

const app = express()
const port = 5000;

//Middlewares(Plugins)
app.use(express.json());
app.use(loggerMiddleware)

//Routes
app.use('/books', router)

app.listen(port,() => console.log(`HTTP server is running on port: ${port}`)) 