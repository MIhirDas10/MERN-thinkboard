import express from "express"
// import { createNote, deleteNote, getAllNotes, updateNote } from "../notesControllers.js";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesControllers.js";

const router = express.Router();

// these are controllers
router.get("/", getAllNotes)        // get all notes
router.get("/:id", getNoteById)     // find a note
router.post("/", createNote)        // create
router.put("/:id", updateNote)      // update
router.delete("/:id", deleteNote)   // delete

export default router