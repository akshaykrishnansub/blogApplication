import express from "express"
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import cookieParser from 'cookie-parser';

import db from './config/db.js'

const app=express();

//serve static files if needed
app.use(express.static("public"));

//Middleware to parse JSON
app.use(express.json());

//middleware for cookie parser
app.use(cookieParser())

//Middleware for form submissions
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

//Use the auth routes
app.use('/auth',authRoutes)

//Blog Routes
app.use('/blogs',blogRoutes);
app.use('/blog',blogRoutes);

const port=process.env.PORT ||3000

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.get("/about",(req,res)=>{
    res.render("aboutus.ejs")
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

const testDB = async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Database connected:", result.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

testDB();

console.log("DATABASE_URL",process.env.DATABASE_URL)

app.listen(port, ()=>{
console.log(`Server running on port: ${port}`)
})