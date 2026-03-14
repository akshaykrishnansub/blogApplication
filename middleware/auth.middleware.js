import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';

const authenticateToken=async(req,res,next)=>{
 const token=req.cookies.token; //getting token from JWT
 
 if(!token){
   return res.redirect("/login");
 }

 try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await findUserById(decoded.id);
    if(!user){
      return res.redirect("/login")
    }
    req.user=user; //attach payload
    next(); //let request continue
 }catch(err){
    return res.redirect("/login")
 }
}

export default authenticateToken