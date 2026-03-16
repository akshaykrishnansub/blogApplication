import { createBlog, deleteBlogById, findBlogById, findBlogByUserId, updateBlogById, searchBlogByUser,getMyBlogs,getTotalBlogs,getTotalUsers, countSearchBlogs} from "../models/blogModel.js";

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
        const user_id=req.user.id;
        const blog_id=req.params.id;
        const blog=await findBlogById(blog_id,user_id);

        if(!blog){
            return res.status(404).json({error:'Blog Not found'});
        }

        res.render("singleBlog.ejs",{blog})
        
    }catch(err){
        console.error("Server error",err);
        return res.status(500).json({error:"Failed to fetch blog"})
    }

}

const deleteBlog=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const blog_id=req.params.id;
        const deletedBlog=await deleteBlogById(blog_id,user_id);

        if(!deletedBlog){
            return res.status(404).json({error:'Blog not found'})
        }

       return res.redirect("/blogs/myblogs");
    }catch(err){
        console.error("Server Error",err);
        return res.status(500).json({error:'Failed to delete blog'});
    }
}

const editBlog=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const blog_id=req.params.id;
        const blog=await findBlogById(blog_id,user_id);
        if(!blog){
            return res.status(404).json({error:'Blog not found or user not authorized'});
        }
        return res.render("editBlog.ejs",{blog,user:req.user});
    }catch(err){
        console.error("Server error",err);
        return res.status(500).json("Error while loading edit blog page");
    }
}

const updateBlog=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const blog_id=req.params.id;
        const {title,category,author,blog_date,body}=req.body;
        const editedBlog=await updateBlogById(blog_id,user_id,title,category,author,blog_date,body);
        if(!editedBlog){
            return res.status(404).json({error:'Blog not found or user not found'});
        }
        return res.status(200).json({message:'Blog updated successfully',blog:editedBlog})
    }catch(err){
        console.error("Server error",err);
        return res.status(500).json("Error while updating blog")
    }
}

const searchBlogs=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const searchTerm=req.query.q || "";
        const page=req.query.page || 1;
        const limit=5; //Number of records per page
        const offset=(page-1)*limit; // Number of records to skip
        const blogs=await searchBlogByUser(user_id,searchTerm,limit,offset);
        const totalBlogs=await countSearchBlogs(user_id,searchTerm);
        const totalPages=Math.max(Math.ceil(totalBlogs/limit),1);
        res.render("myblogs",{blogs:blogs,user:req.user,currentPage:page,totalPages:totalPages,searchQuery:searchTerm});
    }catch(err){
        console.error("Server error",err);
        return res.status(500).json("Error while searching blog")
    }
}

const dashboardPage=async(req,res)=>{
    const totalBlogs=await getTotalBlogs();
    const myBlogs=await getMyBlogs(req.user.id);
    const totalUsers=await getTotalUsers();
    res.render("dashboard",{
        user:req.user,
        totalBlogs,
        myBlogs,
        totalUsers
    })
}

export {composeBlog,selectBlogsByUser,selectBlogById,deleteBlog,editBlog,updateBlog,searchBlogs,dashboardPage}