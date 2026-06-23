const express=require('express');
const app=express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.json());

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`app started at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Welcome To Jwellary Store Backend Server");
})
app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:5174','http://localhost:5173'],
  credentials: true,          
}));
const authroute=require('./Routes/routes');

app.use('/api/v1',authroute);
const dbconnect=require('./config/database');
dbconnect();
