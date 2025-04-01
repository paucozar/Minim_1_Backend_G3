import mongoose from "mongoose";
import { Types } from "mongoose";

export interface IComment {
    content: string;
    userId: Types.ObjectId; 
    gymId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 500 
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    gymId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Gym' 
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;