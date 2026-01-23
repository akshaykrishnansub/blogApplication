import { findUserByEmail,createUser } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const registerUser=async(req,res)=>{
    //getting data from the input
    const {first_name,last_name,email,password}=req.body
    try{
        //checking if user exists
        const existingUser=await findUserByEmail(email)
        if(existingUser)
            return res.status(400).json({error:'User already registered'})

        //hash the password
        const hashedPassword=await bcrypt.hash(password,10);

        //insert new user
        const newUser=await createUser(first_name,last_name,email,hashedPassword)

        //generate a token
        const token=jwt.sign({id:newUser.id},process.env.JWT_SECRET,{expiresIn:'1h'})

        //returning the response
        return res.status(201).json({message:'Registration Successful',token})

    }catch(err){
        console.error(err)
        res.status(500).json({error:'Server error'})
    }
}

const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try{

        //find user by email
        const user=await findUserByEmail(email);
        if(!user){
            return res.status(400).json({error:'User not found'});
        }

        //compare the passwords
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({error:'Invalid credentials'});
        }

        //generate JWT token
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1h'})

        //store token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge:3600000
        });

        //Redirect to compose page
        res.redirect("/blogs/compose")
    }catch(err){
        console.error(err);
        return res.status(500).json({error:'Server error'});
    }

}

const logoutUser=(req,res)=>{
    try{
        //if your JWT is stored in cookies
        res.clearCookie('token',{path:"/",
            httpOnly:true,
            secure:false
        });

        //If you store JWT in localstorage, you need to redirect
        res.redirect('/login');
    }catch(err){
        console.error(err);
        return res.status(500).json({error:'Server error during logout'})
    }
}

export {registerUser,loginUser,logoutUser}