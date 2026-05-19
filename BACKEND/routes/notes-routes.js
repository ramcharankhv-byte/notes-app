import { Router } from "express";
import { createNote, getNotes, deleteNote } from "../controller/note.controller.js"

const noteRouter = Router();

noteRouter
.route("/")
.get(getNotes)
.post(createNote)

noteRouter
.route("/:id")
.delete(deleteNote)

export default noteRouter