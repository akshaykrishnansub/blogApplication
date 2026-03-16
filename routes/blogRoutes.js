import authenticateToken from "../middleware/auth.middleware.js";
import express from 'express';
import { findBlogByUserId, getMyBlogs} from "../models/blogModel.js";
import { composeBlog,deleteBlog,editBlog,selectBlogById, updateBlog,searchBlogs, dashboardPage } from "../controllers/blogController.js";

const router=express.Router();

router.get('/dashboard',authenticateToken,dashboardPage)

router.get("/compose",authenticateToken,(req,res)=>{
    res.render("compose.ejs",{user:req.user})
})

router.get("/myblogs",authenticateToken,async(req,res)=>{
    try{
        const user_id=req.user.id;
        const page=parseInt(req.query.page || 1);
        const limit=5;
        const offset=(page-1)*limit;
        const blogs=await findBlogByUserId(user_id,limit,offset);
        const totalBlogs=await getMyBlogs(user_id);
        const totalPages=Math.max(Math.ceil(totalBlogs/limit),1);
        res.render("myblogs.ejs",{user:req.user,blogs:blogs,searchQuery:"",currentPage:page,totalPages:totalPages});
    }catch(err){
        console.log("Error loading blogs",err);
        res.status(500).send("Server error")
    }
})

router.post('/',authenticateToken,composeBlog);
router.get("/search",authenticateToken,searchBlogs)
router.get("/:id",authenticateToken,selectBlogById);
router.get("/edit/:id",authenticateToken,editBlog)
router.post("/update/:id",authenticateToken,updateBlog)
router.post("/delete/:id",authenticateToken,deleteBlog)

export default router;