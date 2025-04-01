import Comment, { IComment } from "../comments/comment_models.js";


export const createComment = async (commentData: IComment) => {
    if (!commentData.content || !commentData.userId || !commentData.gymId) {
        throw new Error("Faltan datos obligatorios para crear el comentario.");
    }
    const comment = new Comment(commentData);
    return await comment.save();
}

export const getAllComments = async (page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const comments = await Comment.find() 
        .sort({ createdAt: -1 }) // primero los más recientes
        .skip(skip)
        .limit(pageSize);
    const totalComments = await Comment.countDocuments();
    const totalPages = Math.ceil(totalComments / pageSize);
    return {
        comments,
        totalComments,
        totalPages,
        currentPage: page
    };
};

export const updateComment = async (id: string, updateData: Partial<IComment>) => {
    return await Comment.findByIdAndUpdate(id, updateData, { new: true });
}

export const deleteComment = async (id: string) => {
    return await Comment.findByIdAndDelete(id);
}

