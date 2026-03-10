import db from '../config/db.js'

const createBlog=async(user_id,title,category,author,blog_date,body)=>{
    const result=await db.query('INSERT into blogs(user_id,title,category,author,blog_date,body) values($1,$2,$3,$4,$5,$6) RETURNING *',[user_id,title,category,author,blog_date,body]);
    return result.rows[0];
}

const findBlogByUserId=async(userId)=>{
    const result=await db.query("SELECT id,title,category,author,blog_date,body from blogs where user_id=$1",[userId]);
    return result.rows;
}

const findBlogById=async(blogId)=>{
    const result=await db.query('SELECT id,title,category,author,blog_date,body from blogs WHERE id=$1',[blogId]);
    return result.rows[0];
}

export {createBlog,findBlogByUserId,findBlogById}