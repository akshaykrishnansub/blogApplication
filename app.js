import express from "express"

const app=express();

app.set("view engine","ejs")

const port=process.env.PORT ||3000

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.get("/about",(req,res)=>{
    res.render("aboutus.ejs")
})

app.listen(port, ()=>{
console.log(`Server running on port: ${port}`)
})