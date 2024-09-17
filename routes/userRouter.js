import { Router } from "express";
import { createUser, deleteUser, fetchUsers, getUser, updateUser } from "../Controller/UserController.js";

const router = Router();

router.post("/user/create", createUser)
router.put("/user/update/:id", updateUser)
router.get("/users/", fetchUsers)
router.get("/user/:id", getUser)
router.delete("/user/delete/:id", deleteUser)

export default router; 