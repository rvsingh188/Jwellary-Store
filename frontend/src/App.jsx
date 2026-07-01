import { useState,useEffect } from 'react'
import {Routes,Route, useLocation, NavLink,useNavigate} from 'react-router-dom';
import Home from './Components/Home';
import Collections from './Components/Collections';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import About from './Components/About';
import Login from './Components/Login';
import Buynow from './Components/Buynow';
import ProductDetails from './Components/ProductDetails';
import {  toast } from 'react-toastify';
import { IoGift,IoDiamondSharp,IoRibbon,IoCartOutline } from "react-icons/io5";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdCopyright } from "react-icons/md";
import { ImCross } from "react-icons/im";
import './App.css'
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
function App() {
  const [count, setCount] = useState(0)
    const url = import.meta.env.VITE_APP_URL;
    const currentpath=location.pathname;
    const[popup,setpopup]=useState(false);
   const [products, setproducts] = useState([]);
    const [liked, setliked] = useState(() => {
    const result = localStorage.getItem('jwellery-wishlist');
    return result ? JSON.parse(result) : [];
  })
  const [loggedin, setloggedin] = useState(false);
  const [cartproducts, setcartproducts] = useState([]);
  const navigate=useNavigate();
  async function fetchproducts() {
     const response=await fetch(`${url}/api/v1/fetchproducts`,{
      method:"GET",
      headers:{"Content-type":"application/json"},
      credentials:'include'
    })

    return await response.json();
    
  }

  async function fetchcart() {

    const response = await fetch(`${url}/api/v1/getcart`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const result = await response.json();
    if (result.success) {
      setcartproducts(result.data);
    }
    else {
      setcartproducts([]);
    }
  }

  const logoutfunc = async () => {
    try {
      const res = await fetch(`${url}/api/v1/logout`, {
        method: "GET",
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        setloggedin(false);
        navigate('/', { replace: true });
      }

    } catch (error) {
      console.log(error);
    }
  }

  
    const checkauth = async () => {
      try {
        const res = await fetch(`${url}/api/v1/check-auth`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
        const data=await res.json();
        if(data.success){
        setloggedin(true); }
        
        
      }
      catch (error) {
        setloggedin(false);
      }
    } 
    useEffect(()=>{
      const timer=setTimeout(()=>{
        if(!loggedin){
        setpopup(true);
        }
      },5000);
      return ()=> clearTimeout(timer);
    },[loggedin])
    useEffect(()=>{checkauth()},[]);
    useEffect(()=>{fetchcart()},[loggedin]);
  useEffect(()=>{fetchproducts().then(data=>setproducts(data.products));},[])
  return (
    <div class="flex flex-col min-h-screen relative ">

        <div class="flex justify-between items-center w-full p-2  bg-[#FFF8F0]">
          <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781164139/jwellary-logo_xrlsp5.png" alt='logo-img' class="w-10 sm:w-16 h-12  md:h-14 md:w-28" onClick={()=>{navigate('/')}}></img>
          <div class="flex justify-center gap-2 font-semibold text-xs sm:text-lg sm:gap-8 md:text-xl md:gap-12">
          <NavLink to='/'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]  ":""}`}>Home</NavLink>
          <NavLink to='/collections'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]   ":""}`}>Collection</NavLink>
          <NavLink to='/contact'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]  ":""}`}>Contact</NavLink>
          <NavLink to='/about'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]  ":""}`}>About</NavLink>
        
        </div>
          <div class="flex gap-1">
            {loggedin ? (<NavLink to='/'><button class="bg-[#a10202] text-white p-1 pl-1 pr-1 sm:p-2 sm:pl-3 sm:pr-3 md:pl-6 md:pr-6 rounded-[0.3rem] hover:bg-[#b00] cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400" onClick={logoutfunc}>LOG OUT</button></NavLink>) :
              (<NavLink to='/login'><button class="bg-[#a10202] text-white p-1 pl-1 pr-1 sm:p-2 md:pl-6 md:pr-6 rounded-[0.3rem] hover:bg-[#b00] cursor-pointer hover:shadow-2xl hover:-translate-y-0.5 transition ease-out duration-400" >LOG IN</button></NavLink>)}
            <NavLink to='/cart' class="relative">{({ isActive }) => (<><IoCartOutline className={`text-2xl sm:text-3xl cursor-pointer ${isActive ? "text-[#b00]" : ""}`}/><div className="absolute top-2 right-0 bg-[#b00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartproducts.length}</div></>)}</NavLink></div>
          </div>

          <AnimatePresence>
          {popup && <motion.div class="fixed inset-0 z-[999] w-screen h-screen flex justify-center items-center bg-black/40 backdrop-blur-xs overflow-hidden p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <motion.div class="relative w-max h-max flex " initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}transition={{duration: 0.4, ease: "easeOut", }}>
            <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1782380459/16db997c-e795-4b11-8434-3d6accaf3cdc.png" alt="popup-image" class="h-140 sm:w-155 md:h-130 md:w-190 lg:h-140 lg:w-200 rounded-lg"></img>
            <div class="absolute z-13 text-xl right-5 top-3 cursor-pointer" onClick={()=>{setpopup(false)}}><ImCross/></div>
            <div class="absolute z-12 self-start gap-4 sm:gap-8  px-10 py-8 flex  flex-col w-[100%] sm:w-[55%] md:w-[50%] h-full  sm:bg-[#F9F4EE] items-center ">
              <div class="text-[#2D2118] text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-wide text-[#2D2118] text-center">Welcome To Luxora</div>
              <div class="text-[#4B3C2E] text-xl text-2xl text-center">Join our community and enjoy exclusive member benifits</div>
              <div class="text-[#C99A4A] grid  sm:grid-cols-3 gap-6">
                <div class="flex gap-2 md:text-lg text-xl flex-col text-[#4B3C2E] sm:text-[#C99A4A] items-center text-center"><IoDiamondSharp class="text-2xl sm:text-3xl md:text-5xl "/><div>Exclusive OFfers</div></div>
                <div  class="flex gap-2 md:text-lg text-xl flex-col text-[#4B3C2E] sm:text-[#C99A4A] items-center text-center "><IoGift class="text-2xl sm:text-3xl md:text-5xl"/><div >Early access to new collection</div></div>
                <div  class="flex gap-2 md:text-lg text-xl flex-col text-[#4B3C2E] sm:text-[#C99A4A] items-center text-center"><IoRibbon class="text-2xl sm:text-3xl md:text-5xl"/><div >Special Member Rewards</div></div>
              </div>
              
              <button class="h-12 w-30 bg-[#a46b2c] text-white rounded-[0.3rem] cursor-pointer" onClick={()=>{navigate('/login')}}>Join Now</button>
              <button class=" text-[#4B3C2E] sm:text-[#C99A4A] -mt-4 cursor-pointer" onClick={()=>{setpopup(false)}}>Continue Browsing</button>
            </div>
          </motion.div>
          </motion.div>}

          </AnimatePresence>


    {currentpath!=="/login" &&
    <div class="flex flex-col gap-6 absolute bottom-0 z-100 w-full bg-[#23201D] text-[#F4EFE8] pb-4 pt-4">
      <div class="flex p-2 md:pl-4 md:pr-4  w-full justify-between flex-wrap-reverse gap-4 sm:gap-8  ">
        
        <div class="flex flex-col gap-4 flex-wrap ">
            <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781164139/jwellary-logo_xrlsp5.png" class="h-20 w-32 items-center"></img>
            <div class="flex items-center gap-3 text-sm sm:text-base"><IoDiamondSharp class="text-[#C99A4A]"/> Premium Quality</div>
            <div class="flex items-center gap-3 text-sm sm:text-base"><BsShieldFillCheck class="text-[#C99A4A]"/>Certified Jwellery</div>        
        </div>
      
        <div class="flex flex-col gap-3 text-base">
          <div class="font-semibold text-[#C99A4A]">Shop</div>
          <div onClick={()=>{navigate('/collections',{state:{type:"Ring"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] " >Ring</div>
          <div onClick={()=>{navigate('/collections',{state:{type:"Necklace"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Neclace</div>
          <div onClick={()=>{navigate('/collections',{state:{type:"Bracelet"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Bracelet</div>
          <div onClick={()=>{navigate('/collections',{state:{type:"Earrings"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Earring</div>
        </div> 
      
        <div class="flex flex-col gap-3 text-base">
          <div class="font-semibold text-[#C99A4A] ">About US</div>
          <div onClick={()=>{navigate('/contact')}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Contact</div>
          <div onClick={()=>{navigate('/about')}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">About</div>
          <div>Carrers</div>
          <div>Blog</div>
        </div>

        <div class="flex flex-col gap-4 w-full md:w-auto items-center mb-8 sm:mb-0">
          <div class="font-semibold text-center text-[#C99A4A]">Subscribe to our NewsLetter</div>
          <div class="flex w-full max-w-md overflow-hidden rounded-[0.3rem] border border-[#C99A4A] bg-[#26231F]">
            <input type="text" placeholder="Enter Your Email" class="flex-1 bg-transparent px-3 py-1 text-[#F4EFE8] placeholder:text-[#8F8B84] focus:outline-none"></input>
            <button class="bg-[#C99A4A] px-3 font-medium text-[#1B1A17] transition-all duration-300 hover:bg-[#D8A857]">Subscribe</button>
          </div>
          <div class="text-center flex items-center gap-3"><FaCheckCircle class="text-[#C99A4A] text-center"/>Get Updated Every Day</div>
          <div class="text-center flex items-center gap-3"><FaCheckCircle class="text-[#C99A4A] text-center"/>No Spam, unsubscribe anytime</div>
        </div>
      </div>
      <div class=" flex flex-col gap-4 px-8 md:px-30 ">
        <hr class="text-[#C99A4A]"/>
        <div class="flex justify-center gap-3 md:gap-6 text-sm flex-col md:flex-row items-center">
        <div class="flex items-center"><MdCopyright />2026 <span class="text-[#C99A4A] px-1"> Luxora Jewels. </span> All Rights Reserved</div>
        <div>Privacy Policy | Terms & Conditions </div>
        </div>
      </div>        
    </div>} 
      <Routes>
        <Route path='/' element={<Home products={products} liked={liked} setliked={setliked}></Home>}></Route>
        <Route path='/collections' element={<Collections products={products} liked={liked} setliked={setliked} cartproducts={cartproducts} setcartproducts={setcartproducts}></Collections>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/login' element={<Login loggedin={loggedin} setloggedin={setloggedin}></Login>}></Route>
        <Route path='/cart' element={<Cart cartproducts={cartproducts} setcartproducts={setcartproducts} liked={liked} setliked={setliked}></Cart>}></Route>
        <Route path='/product-details/:id' element={<ProductDetails products={products} setproducts={setproducts} loggedin={loggedin} cartproducts={cartproducts} setcartproducts={setcartproducts}></ProductDetails>}></Route>
        <Route path='/buy-now/:id' element={<Buynow products={products} setproducts={setproducts} loggedin={loggedin} cartproducts={cartproducts} setcartproducts={setcartproducts}></Buynow>}></Route>

      </Routes>
    </div>
  )
}

export default App
