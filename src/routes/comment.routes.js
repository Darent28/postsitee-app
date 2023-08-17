import { Router } from 'express';
import { postComment, getComment } from '../controllers/comment.controller.js';


const router = Router();

router.post("/postComment", postComment);
router.get("/getComment", getComment);

export default router;