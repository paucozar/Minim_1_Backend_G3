import { createComment, getAllComments, updateComment, deleteComment } from "./comment_service.js";

import { Request, Response } from "express";

export const createCommentHandler = async (req: Request, res: Response) => {
    try {
        const { content, userId, gymId, postId } = req.body;

        if (!gymId) {
            return res.status(400).json({ error: "Debes proporcionar un gymId." });
        }

        const comment = await createComment({ content, userId, gymId, createdAt: new Date(), updatedAt: new Date() });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getAllCommentsHandler = async (req: Request, res: Response) => {
    try {
        const { page, pageSize } = req.query;
        const comments = await getAllComments(Number(page), Number(pageSize));
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCommentHandler = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedComment = await updateComment(id, updateData);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json(updatedComment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCommentHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedComment = await deleteComment(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json({ message: 'Comentario eliminado correctamente' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}