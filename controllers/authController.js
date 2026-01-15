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

        res.status(201).json({message:'Registration successful',token})

    }catch(err){
        console.error(err)
        res.status(500).json({error:'Server error'})
    }
}

export {registerUser}