import authenticateToken from "../middleware/auth.middleware.js";
import express from 'express';
import { findBlogByUserId } from "../models/blogModel.js";
import { composeBlog,selectBlogById } from "../controllers/blogController.js";

const router=express.Router();

router.get('/dashboard',authenticateToken,(req,res)=>{
    res.render("dashboard.ejs",{user:req.user})
})

router.get("/compose",authenticateToken,(req,res)=>{
    res.render("compose.ejs",{user:req.user})
})

router.get("/myblogs",authenticateToken,async(req,res)=>{
    try{
        const user_id=req.user.id;
        const blogs=await findBlogByUserId(user_id)
        res.render("myblogs.ejs",{user:req.user,blogs:blogs});
    }catch(err){
        console.log("Error loading blogs",err);
        res.status(500).send("Server error")
    }
})

router.post('/',authenticateToken,composeBlog);
router.get("/:id",authenticateToken,selectBlogById);

export default router;