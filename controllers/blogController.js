import { createBlog, findBlogById, findBlogByUserId } from "../models/blogModel.js";

const composeBlog=async(req,res)=>{
    try{
        //getting the blog data entered by the user
        const {title,category,author,blog_date,body}=req.body;

        //extracting user id
        const user_id=req.user.id;

        //creating a new blog
        const newBlog=await createBlog(user_id,title,category,author,blog_date,body);

        //sending the response back to the frontend
        return res.status(201).json({message:'Blog Stored successfully',blog:newBlog})
    }catch(err){
        console.error(err);
        return res.status(500).json({error:'Failed to create blog'});
    }
}

const selectBlogsByUser=async(req,res)=>{
    try{
        const user_id=req.user.id; // using JWT
        const myBlogs=await findBlogByUserId(user_id);
        if(!myBlogs.length){
            return res.status(404).json({message:'No blogs found',blogs:[]})
        }
        return res.status(200).json({message:'Blog fetched successfully',blogs:myBlogs});
    }catch(err){
        console.log("Error fetching your blogs",err);
        return res.status(500).json({error:'Failed to fetch the blogs'})
    } 
}

const selectBlogById=async(req,res)=>{
    try{
        const blog_id=req.params.id;
        const blog=await findBlogById(blog_id);

        if(!blog){
            return res.status(404).json({error:'Blog Not found'});
        }

        res.render("singleBlog.ejs",{blog})
        
    }catch(err){
        console.error("Server error",err);
        return res.status(500).json({error:"Failed to fetch blog"})
    }

}

export {composeBlog,selectBlogsByUser,selectBlogById}