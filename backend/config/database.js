const mongoose=require('mongoose');
require("dotenv").config();
const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("Database Connected Successfully"))
    .catch(()=>{
        console.log(error);
        process.exit(1);
    })
}
module.exports=dbconnect;