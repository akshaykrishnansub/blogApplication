import jwt from 'jsonwebtoken';

const authenticateToken=(req,res,next)=>{
 const token=req.cookies.token; //getting token from JWT
 
 if(!token){
   return res.redirect("/login");
 }

 try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded; //attach payload
    next(); //let request continue
 }catch(err){
    return res.redirect("/login")
 }
}

export default authenticateToken