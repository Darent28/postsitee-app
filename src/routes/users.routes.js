import { Router } from 'express';
import { getUser, 
        createUser, 
        postUserlogin, 
        getCurrentUser,
        protectedLogin} from '../controllers/users.controller.js';

const router = Router();

router.post ("/register", createUser)

router.post ("/login", postUserlogin)

function ensuretoken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);

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
router.get ("/protected",  protectedLogin)

router.get ("/home", ensuretoken, getCurrentUser)

router.get ("/users", getUser)



export default router;