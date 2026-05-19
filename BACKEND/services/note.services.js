import { Note } from "../model/notes-model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asynchandler.js";

const createNoteService = async(noteData)=>{
  if(!noteData || !noteData.title){
    throw new ApiError(400,"title not found")
  }
  
  const note = await Note.create({
    title: noteData.title,
    content: noteData.content,
    createdAt: Date.now()
  })
  return note;
}

const getNotesService = async () => {
  const notes = await Note.find().sort({ createdAt: -1 });
  return notes;
}

const deleteNoteService = async (id) => {
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote) {
    throw new ApiError(404, "Note not found");
  }
  return deletedNote;
}

export { createNoteService, getNotesService, deleteNoteService };