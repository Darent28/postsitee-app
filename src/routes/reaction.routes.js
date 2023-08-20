import { Router } from 'express';
import { postReaction, updateReaction } from '../controllers/reaction.controller.js';

const router = Router();

router.post("/postReaction", postReaction);
router.put("/updateReaction", updateReaction);

export default router;