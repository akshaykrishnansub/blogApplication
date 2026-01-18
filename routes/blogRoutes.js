import authenticateToken from "../middleware/auth.middleware.js";
import express from 'express';

const router=express.Router();

router.get('/compose',authenticateToken,(req,res)=>{
    res.render("compose.ejs",{user:req.user})
})

export default router;