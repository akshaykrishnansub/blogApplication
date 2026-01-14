import db from '../config/db.js'

const findUserByEmail=async(email)=>{
    const result=await db.query('SELECT * FROM blog_users WHERE email=$1',[email])
    return result.rows[0]
}

const createUser=async(first_name,last_name,email,hashedPassword)=>{
    const result=await db.query('INSERT into blog_users (first_name,last_name,email,password) VALUES($1,$2,$3,$4) RETURNING *',[first_name,last_name,email,hashedPassword])
    return result.rows[0]
}

export {findUserByEmail,createUser}