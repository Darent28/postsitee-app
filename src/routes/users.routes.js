import { Router } from 'express';
import { getUser, 
        createUser, 
        postUserlogin, 
        getCurrentUser,
        protectedLogin,
        edituserPhoto,
        getProfile,
        edituserCover,
        edituser,
        edituserPassword
        } from '../controllers/users.controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
      cb(null, Date.now() +  '-' + file.originalname)
  }
})



const UploadPhoto = multer({
  storage: diskStorage
}).single('imgPhoto')

const UploadPhoto2 = multer({
  storage: diskStorage
}).single('imgCover')

router.post ("/register", createUser)
router.post ("/login", postUserlogin)

function ensuretoken(req, res, next) {
  const bearerHeader = req.headers['authorization'];


  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403)
  }
}
router.get ("/protected", protectedLogin)
router.get ("/home", ensuretoken, getCurrentUser)
router.get ("/users", getUser)
router.get ("/getProfile/:id", getProfile)

router.put ("/editUserPhoto/:id", UploadPhoto, edituserPhoto)
router.put ("/editUserCover/:id", UploadPhoto2, edituserCover)
router.put ("/editUser/:id", UploadPhoto, edituser)
router.put ("/editUserPassword/:id", edituserPassword)



export default router;