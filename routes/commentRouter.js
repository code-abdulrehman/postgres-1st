import { Router } from "express";
import { createComment, deleteComment, fetchComments, getComment, updateComment } from "../Controller/CommetController.js";

const router = Router();

router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/:id", getComment);
router.get("/", fetchComments);

export default router; 