import { Schema, model } from "mongoose";

// User Schema
const NoteSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

// User model
const Note = model("Note", NoteSchema)

export default Note;