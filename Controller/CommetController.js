import prisma from "../DB/db.config.js";

// createcomment
export const createComment = async(req, res) => {

    const { postId, userId, comment } = req.body;

    await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            comments_count: {
                increment: 1
            }
        }
    })
    const newcomment = await prisma.comment.create({
        data: {
            postId: Number(postId),
            userId: Number(userId),
            comment
        },
    });

    return res.status(200).json({ data: newcomment, message: "Comment successfully created." });

}
// get all comment 
export const fetchComments = async(req, res) => {

    const comments = await prisma.comment.findMany({
        include :{
            post: {
                include: {
                    user:true
                }
            },
            user:true
        }
    });

      // Check if no comment found
      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: "No comment found." });
    }


    return res.status(200).json({ data: comments, message: "comments retrieved successfully." });

}

// update comment ny id 
export const updateComment = async(req, res) => {

    const commentId = req.params.id;

    const { postId,userId, comment } = req.body;

    const updatecomment = await prisma.comment.update({
        where: {
            id: Number(commentId),
        },
        data: {
          postId: Number(postId),
            userId: Number(userId),
            comment:comment
        },
    });


    return res.status(200).json({ status:200,data:updatecomment, message: "comment successfully updated." });

}

// get comment by id 
export const getComment = async(req, res) => {

    const commentId = req.params.id;


    const comment = await prisma.comment.findFirst({
        where: {
            id: Number(commentId),
        }
    });


    return res.status(200).json({ status:200,data:comment, message: "Fetch comment successfully." });

}

// deletecomment by id 
export const deleteComment = async(req, res) => {

    const commentId = req.params.id;


    await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            comments_count: {
                decrement: 1
            }
        }
    })

    await prisma.comment.delete({
        where: {
            id: Number(commentId),
        },
    });


    return res.status(200).json({ status:200, message: "comment successfully deleted." });

}