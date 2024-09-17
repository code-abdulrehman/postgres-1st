import prisma from "../DB/db.config.js";

// createPost
export const createPost = async(req, res) => {

    const { userId, title, description,img_url } = req.body;

    const newPost = await prisma.post.create({
        data: {
            userId: Number(userId),
             title,
             description,
             img_url
        },
    });

    return res.status(200).json({ data: newPost, message: "User successfully created." });

}
// get all post 
export const fetchPosts = async(req, res) => {

    const posts = await prisma.post.findMany({
        include: {
            // comments: true, //full comments
            comments: {
                include: {
                    // user:true, //full user
                    user: {
                        select: {
                            name:true,
                            avatar_url:true
                        }
                    }
                }
            }
        }
    });

      // Check if no post found
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No Post found." });
    }


    return res.status(200).json({ data: posts, message: "Posts retrieved successfully." });

}

// update post ny id 
export const updatePost = async(req, res) => {

    const postId = req.params.id;

    const { userId, title, description, img_url } = req.body;

    const updatePost = await prisma.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            userId: Number(userId),
             title: title,
             description: description,
             img_url: img_url
        },
    });


    return res.status(200).json({ status:200,data:updatePost, message: "Post successfully updated." });

}

// get post by id 
export const getPost = async(req, res) => {

    const postId = req.params.id;


    const post = await prisma.post.findFirst({
        where: {
            id: Number(postId),
        }
    });


    return res.status(200).json({ status:200,data:post, message: "Fetch post successfully." });

}

// deletePost by id 
export const deletePost = async(req, res) => {

    const postId = req.params.id;

    await prisma.post.delete({
        where: {
            id: Number(postId),
        },
    });


    return res.status(200).json({ status:200, message: "Post successfully deleted." });

}