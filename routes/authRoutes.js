import {Router} from "express"
import { registerUser } from "../controllers/authController.js";

const router=Router();

router.post('/signup',registerUser)

export default router;