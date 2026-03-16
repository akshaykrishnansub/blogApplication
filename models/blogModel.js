import db from '../config/db.js'

const createBlog=async(user_id,title,category,author,blog_date,body)=>{
    const result=await db.query('INSERT into blogs(user_id,title,category,author,blog_date,body) values($1,$2,$3,$4,$5,$6) RETURNING *',[user_id,title,category,author,blog_date,body]);
    return result.rows[0];
}

const findBlogByUserId=async(userId,limit,offset)=>{
    const result=await db.query("SELECT id,title,category,author,blog_date,body from blogs where user_id=$1 ORDER BY blog_date DESC LIMIT $2 OFFSET $3",[userId,limit,offset]);
    return result.rows;
}

const findBlogById=async(blogId,userId)=>{
    const result=await db.query('SELECT id,title,category,author,blog_date,body from blogs WHERE id=$1 and user_id=$2',[blogId,userId]);
    return result.rows[0];
}

const deleteBlogById=async(id,userId)=>{
    const result=await db.query('DELETE from blogs where id=$1 AND user_id=$2 RETURNING *',[id,userId]);
    return result.rows[0];
}

const updateBlogById=async(id,userId,title,category,author,blog_date,body)=>{
    const result=await db.query('UPDATE blogs SET title=$1,category=$2,author=$3,blog_date=$4,body=$5,updated_timestamp=CURRENT_TIMESTAMP where id=$6 and user_id=$7 returning *',[title,category,author,blog_date,body,id,userId]);
    return result.rows[0]
}

const searchBlogByUser=async(user_id,searchTerm,limit,offset)=>{
    const result=await db.query(`SELECT id,title,category,author,blog_date,body FROM blogs WHERE user_id=$1 AND (title ILIKE $2 OR category ILIKE $2 OR author ILIKE $2) ORDER BY blog_date DESC LIMIT $3 OFFSET $4`,[user_id,`%${searchTerm}%`,limit,offset])
    return result.rows;
}

const getTotalBlogs=async()=>{
    const result=await db.query('SELECT COUNT(*) from blogs');
    return Number(result.rows[0].count);
}

const getMyBlogs=async(userId)=>{
    const result=await db.query('SELECT COUNT(*) from blogs WHERE user_id=$1',[userId]);
    return Number(result.rows[0].count);
}

const getTotalUsers=async()=>{
    const result=await db.query('SELECT COUNT (*) from blog_users');
    return Number(result.rows[0].count);
}

//count of searched blogs
const countSearchBlogs=async(user_id,searchTerm)=>{
    const result=await db.query(`SELECT COUNT(*) FROM blogs WHERE user_id=$1 AND (title ILIKE $2 OR category ILIKE $2 OR author ILIKE $2)`,[user_id,`%${searchTerm}%`]);
    return Number(result.rows[0].count)
}

export {createBlog,findBlogByUserId,findBlogById,deleteBlogById,updateBlogById,searchBlogByUser,getTotalBlogs,getMyBlogs,getTotalUsers,countSearchBlogs}