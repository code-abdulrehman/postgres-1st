import prisma from "../DB/db.config.js";

// createuser 
export const createUser = async(req, res) => {

    const { name, email, password, avatar_url } = req.body;

    const findUser = await prisma.user.findUnique({

        where : {
            email: email,
        }
    });

    if(findUser) {
        return res.json({status:400, message: "User Email already taken . Please another email"})
    };

    const newUser = await prisma.user.create({
        data: {
            name:name,
            email: email,
            password: password,
            avatar_url:avatar_url
        },
    });

    return res.status(200).json({ data: newUser, message: "User successfully created." });

}
// get all users 
export const fetchUsers = async(req, res) => {

    const users = await prisma.user.findMany({

        // select: {
        //     _count: {
        //         select: {
        //             post: true,
        //             comments: true
        //         }
        //     }
        // },
        include:{
            post:true
        }
      
    });

      // Check if no users found
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found." });
    }

    // Return users if found
    return res.status(200).json({ data: users, message: "Users retrieved successfully." });

}

// update user ny id 
export const updateUser = async(req, res) => {

    const userId = req.params.id;

    const { name, email, password, avatar_url } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name: name,
            email:email,
            password: password,
            avatar_url: avatar_url
        },
    });


    return res.status(200).json({ status:200, message: "User successfully updated." });

}

// get user by id 
export const getUser = async(req, res) => {

    const userId = req.params.id;


    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId),
        }
    });


    return res.status(200).json({ status:200,data:user, message: "Fetch User successfully." });

}

// deleteUser by id 
export const deleteUser = async(req, res) => {

    const userId = req.params.id;

    await prisma.user.delete({
        where: {
            id: Number(userId),
        },
    });


    return res.status(200).json({ status:200, message: "User successfully deleted." });

}