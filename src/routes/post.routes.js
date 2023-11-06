import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { postPost, getPost, deletePost, editPost, geteditPost } from '../controllers/post.controller.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskStorage
}).single('image_data')

router.post ("/post", fileUpload, postPost);
router.get ("/getpost", getPost);
router.get ("/getPost/:id", geteditPost);
router.delete ("/deletePost/:id", deletePost);
router.put ("/editPost/:id", fileUpload, editPost);

export default router;