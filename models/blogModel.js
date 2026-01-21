import db from '../config/db.js'

const createBlog=async(user_id,title,category,author,blog_date,body)=>{
    const result=await db.query('INSERT into blogs(user_id,title,category,author,blog_date,body) values($1,$2,$3,$4,$5,$6) RETURNING *',[user_id,title,category,author,blog_date,body]);
    return result.rows[0];
}

export {createBlog}