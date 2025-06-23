import mongoose from "mongoose";

// 1. schema
// 2. model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    }, 
    {timestamps: true}
)

// create a "Note" model based on this schema
// it will have title, content & timestamps
const Note = mongoose.model("Note", noteSchema)

export default Note