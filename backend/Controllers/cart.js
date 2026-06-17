const Cart=require('../models/cart');
const Product=require('../models/products');
const user = require("../models/user");
exports.addproduct = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = req.user.id;
    const usercart = await Cart.findOne({ user: user_id });
    if (!usercart) {
      return res.status(400).json({
        success: false,
        message: "Unable To Find User",
      });
    } else {
      try {
        let prod = await Product.findById(id);
        if (!prod) {
          return res.status(400).json({
            message: "Unable To Find Product",
            success: false,
          });
        }
        const existingprod = usercart.products.find((item) =>item.product.toString() === prod._id.toString() );
        
        if (existingprod) {
          if(existingprod.quantity===prod.stock){
          return res.status(409).json({
            success:false,
            message:`Only ${prod.stock} Left`
          })
        }
          existingprod.quantity = existingprod.quantity + 1;
        } else {
          usercart.products.push({product: prod._id,quantity: 1});
        }
        await usercart.save();
      } catch (error) {
        return res.status(400).json({
          message: "unable to add",
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        message: "cart added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,

      message: "Internal Servor Error",
    });
  }
};
exports.deleteproduct = async (req, res) => {
  try {
    const {id}= req.body;
    const user_id = req.user.id;
    const usercart = await Cart.findOne({ user: user_id });
    if (!usercart) {
      return res.status(400).json({
        success: false,
        message: "Unable To Find User",
      });
    }
    const prod = await Product.findById(id);
    if (!prod) {
      return res.status(400).json({
        message: "Unable To Find Product",
        success: false,
      });
    }
    const index = usercart.products.findIndex((item) =>item.product.toString() === prod._id.toString());

    if (index !== -1) {
      if (usercart.products[index].quantity > 1) {
        usercart.products[index].quantity -= 1;
      } else {
        usercart.products.splice(index, 1); 
      }
    }

    await usercart.save();
    return res.status(200).json({
      success: true,
      message: "product removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Servor Error",
    });
  }
};
exports.getcart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user_cart = await Cart.findOne({ user: user_id });
    let product_array = [];
    for (const item of user_cart.products) {
      const prod = await Product.findById(item.product);
      const obj = {_id:prod._id, name: prod.name, category: prod.category, date: prod.date, bestseller: prod.bestseller, price: prod.price,
        description: prod.description,count: item.quantity,images: prod.images};
      product_array = [...product_array, obj];
    }

    return res.status(200).json({
      message: "Cart found successfully",
      success: true,
      data: product_array,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
exports.clearproduct=async(req,res)=>{
  try{
    const {id}= req.body;
    const user_id = req.user.id;
    const usercart = await Cart.findOne({ user: user_id });
    if (!usercart) {
      return res.status(400).json({
        success: false,
        message: "Unable To Find User",
      });
    }
    const prod = await Product.findById(id);
    if (!prod) {
      return res.status(400).json({
        message: "Unable To Find Product",
        success: false,
      });
    }
    const index = usercart.products.findIndex((item) =>item.product.toString() === prod._id.toString());
    if (index === -1) {
  return res.status(404).json({
    success: false,
    message: "Product not found in cart",
  });
}

    usercart.products.splice(index, 1); 
    await usercart.save();
    return res.status(200).json({
      success: true,
      message: "product removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Servor Error",
    });
  }
}