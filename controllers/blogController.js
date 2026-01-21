import { createBlog } from "../models/blogModel.js";

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

export {composeBlog}