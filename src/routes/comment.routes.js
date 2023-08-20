import { Router } from 'express';
import { postComment, getComment, editComment, deleteComment } from '../controllers/comment.controller.js';


const router = Router();

router.post("/postComment", postComment);
router.get("/getComment", getComment);
router.put ("/editComment/:id", editComment);
router.delete ("/deleteComment/:id", deleteComment);

export default router;