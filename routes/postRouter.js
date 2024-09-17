import { Router } from "express";
import { createPost, deletePost, fetchPosts, getPost, updatePost } from "../Controller/PostController.js";

const router = Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);
router.get("/", fetchPosts);

export default router; 