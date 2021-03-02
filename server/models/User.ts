import * as mongoose from 'mongoose';
import { emailValidation } from "../validations";
import { Document } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: emailValidation
    },
    hash: { type: String, required: true },
    stayAnonymous : { type: Boolean, required: true },
    username: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

export const User = mongoose.model('User', userSchema);

export interface UserInterface extends Document {
    email: string;
    hash: string;
    stayAnonymous: boolean;
    username: string;
    posts: string[];
}