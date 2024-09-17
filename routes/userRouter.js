import { Router } from "express";
import { createUser, deleteUser, fetchUsers, getUser, updateUser } from "../Controller/UserController.js";

const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", fetchUsers);

export default router; 