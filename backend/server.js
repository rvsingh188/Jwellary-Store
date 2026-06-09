const express=require('express');
const app=express();
require("dotenv").config();
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`app started at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Welcome To Jwellary Store Backend Server");
})
const dbconnect=require('./config/database');
dbconnect();
