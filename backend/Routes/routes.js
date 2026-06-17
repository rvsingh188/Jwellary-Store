const express=require('express');
const router=express.Router();
const {fetchproducts}=require('../Controllers/products');
const{login,signup}=require('../Controllers/login');
const {auth,checkauth}=require('../Middleware/auth');
const {addproduct,deleteproduct,getcart,clearproduct}=require('../Controllers/cart');
const{logout}=require('../Controllers/logout');
router.get('/fetchproducts',fetchproducts);
router.post('/login',login);
router.post('/signup',signup);
router.get('/check-auth',auth,checkauth);
router.put('/addproduct',auth,addproduct);
router.put('/deleteproduct',auth,deleteproduct);
router.get('/getcart',auth,getcart);
router.put('/clearproduct',auth,clearproduct);
router.get('/logout',auth,logout);

module.exports=router;