import { Note } from "../model/notes-model.js"
import { asyncHandler } from "../utils/asynchandler.js"
import { apiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"
import { createNoteService, getNotesService, deleteNoteService } from "../services/note.services.js"

const createNote = asyncHandler(async(req,res)=>{

    const createdNote = await createNoteService(req.body);

     return res
        .status(201)
        .json(
          new apiResponse(
            201,
            createdNote,
            "Notes created successfully"
          ),
        );
  
})

const getNotes = asyncHandler(async(req, res) => {
    const notes = await getNotesService();
    return res
        .status(200)
        .json(
            new apiResponse(200, notes, "Notes fetched successfully")
        );
});

const deleteNote = asyncHandler(async(req, res) => {
    const { id } = req.params;
    await deleteNoteService(id);
    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Note deleted successfully")
        );
});

export { createNote, getNotes, deleteNote };