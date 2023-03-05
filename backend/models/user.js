import { Schema, model } from "mongoose";
import beautifyUnique from 'mongoose-beautiful-unique-validation';
// User Schema
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
})

UserSchema.plugin(beautifyUnique);
const User = model("User", UserSchema)

export default User;