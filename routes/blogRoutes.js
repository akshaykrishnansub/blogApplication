import authenticateToken from "../middleware/auth.middleware.js";
import express from 'express';
import { composeBlog } from "../controllers/blogController.js";

const router=express.Router();

router.get('/dashboard',authenticateToken,(req,res)=>{
    res.render("dashboard.ejs",{user:req.user})
})

router.get("/compose",authenticateToken,(req,res)=>{
    res.render("compose.ejs",{user:req.user})
})

router.get("/myblogs",authenticateToken,(req,res)=>{
    res.render("myblogs.ejs",{user:req.user});
})

router.post
router.post('/',authenticateToken,composeBlog);

export default router;