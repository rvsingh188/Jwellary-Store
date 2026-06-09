const mongoose=require('mongoose');

const cartschema=new mongoose.model({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ]
},{timestamps:true})
module.export=mongoose.model('Cart',cartschema)