import { Router } from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js"
const router = Router();

router.use("/api/users", userRouter)
router.use("/api/posts", postRouter)
router.use("/api/comments", commentRouter)
export default router;