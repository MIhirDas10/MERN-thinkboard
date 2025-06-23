import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "../src/routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// --- middleware ---
// it will parse JSON bodies: req.body
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json())  // just because we added this middleware, we can get things from the body (title, content fields) written in notesController.js
app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

// simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next()
// })

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT:", PORT)
    })
})



