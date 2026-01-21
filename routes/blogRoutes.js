import authenticateToken from "../middleware/auth.middleware.js";
import express from 'express';
import { composeBlog } from "../controllers/blogController.js";

const router=express.Router();

router.get('/compose',authenticateToken,(req,res)=>{
    res.render("compose.ejs",{user:req.user})
})

router.post('/',authenticateToken,composeBlog);

export default router;