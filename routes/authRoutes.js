import {Router} from "express"
import { loginUser, registerUser,logoutUser } from "../controllers/authController.js";

const router=Router();

router.post('/signup',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

export default router;