import jwt from 'jsonwebtoken';

const authenticateToken=(req,res,next)=>{
 const token=req.cookies.token;
 
 if(!token)
    return res.status(401).send('Access Denied');

 try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded; //attach payload
    next(); //let request continue
 }catch(err){
    res.status(403).send('Invalid Token')
 }
}

export default authenticateToken