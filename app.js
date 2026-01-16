import express from "express"
import authRoutes from "./routes/authRoutes.js"

const app=express();

//serve static files if needed
app.use(express.static("public"));

//Middleware to parse JSON
app.use(express.json());

//Middleware for form submissions
app.use(express.urlencoded({extended:true}));

//Use the auth routes
app.use('/auth',authRoutes)

app.set("view engine","ejs");

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

app.get("/compose",(req,res)=>{
    res.render("compose.ejs")
})



app.listen(port, ()=>{
console.log(`Server running on port: ${port}`)
})