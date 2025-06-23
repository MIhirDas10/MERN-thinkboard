import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "../src/routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// --- middleware ---
// it will parse JSON bodies: req.body

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}


app.use(express.json())  // just because we added this middleware, we can get things from the body (title, content fields) written in notesController.js
app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
}

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



