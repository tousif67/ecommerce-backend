const express =require('express');
const cors =require('cors');
const authRouters=require("./routes/auth.router.js")
const userRouters=require("./routes/user.router.js")
const app =express()

app.use(express.json())
app.use(cors())
app.use("/auth",authRouters)
app.use("/users",userRouters)
app.get("/",(req,res)=>{
        return res.status(200).send({messasge :"welcome to ecommerce api ", status:true})
})

module.exports=app;