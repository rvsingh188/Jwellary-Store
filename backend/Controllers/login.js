const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const Cart=require('../models/cart');
require("dotenv").config();
exports.signup=async(req,res)=>{
    try{
        const{name,email,password,phone}=req.body;
        console.log(name,email,password,phone);
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({
                success:false,
                message:"USer Already Exists",
            })
        }
        let hashedpass=await bcrypt.hash(password,10);
        const newuser=await User.create({name,email,password:hashedpass,phone});
        await Cart.create({user:newuser._id,products:[]});
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        const payload={email:newuser.email,id:newuser._id};
        
            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.cookie("token",token,options).status(200).json({
                success:true,
                data:newuser,
                message:"Logged In Successfully"
            })
}
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Servor Error"
        })
    }
}
exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body; 
        let exists=await User.findOne({email});
        if(!exists){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            })
        }
        
        if(await bcrypt.compare(password,exists.password)){
            const payload={email:exists.email,id:exists._id};
            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
            exists=exists.toObject();
            exists.password = undefined;
            const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
            sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
            return res.cookie("token",token,options).status(200).json({
                success:true,
                data:exists,
                message:"Logged In Successfully"
            })
        }

        else{
            return res.status(403).json({
                success:false,
                message:"Password Does Not Matched"
            })
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal Servor Error"
        })
    }
}