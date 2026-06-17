import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {Routes,Route, useLocation, NavLink,useNavigate} from 'react-router-dom';
import Home from './Components/Home';
import Collections from './Components/Collections';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import About from './Components/About';
import Login from './Components/Login';
import Buynow from './Components/Buynow';
import ProductDetails from './Components/ProductDetails';
import { IoCartOutline } from 'react-icons/io5'
import {  toast } from 'react-toastify';
import './App.css'
function App() {
  const [count, setCount] = useState(0)
    const url = import.meta.env.VITE_APP_URL;
    const currentpath=location.pathname;
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
        if (data.role==="user") { setloggedin(true); }
        else(setadminloggedin(true))
        }
      }
      catch (error) {
        setloggedin(false);
      }
    } 
    useEffect(()=>{checkauth(),fetchcart()},[]);
  useEffect(()=>{fetchproducts().then(data=>setproducts(data.products));},[])
  return (
    <div class="flex flex-col min-h-screen relative ">

        <div class="flex justify-between items-center w-full p-2  bg-[#FFF8F0]">
          <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781164139/jwellary-logo_xrlsp5.png" alt='logo-img' class="w-16 h-12  md:h-14 md:w-28" onClick={()=>{navigate('/')}}></img>
          <div class="flex justify-center gap-2 font-semibold text-xs sm:text-lg sm:gap-8 md:text-xl md:gap-12">
          <NavLink to='/'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]  ":""}`}>Home</NavLink>
          <NavLink to='/collections'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]   ":""}`}>Collection</NavLink>
          <NavLink to='/contact'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]  ":""}`}>Contact</NavLink>
          <NavLink to='/about'  className={({isActive})=>`relative pb-0.2 hover:text-[#a46b2c] ${isActive?"text-[#bf9a33]  ":""}`}>About</NavLink>
        
        </div>
          <div class="flex gap-1">
            {loggedin ? (<NavLink to='/'><button class="bg-[#a10202] text-white p-1 pl-1 pr-1 sm:p-2 sm:pl-3 sm:pr-3 md:pl-6 md:pr-6 rounded-[0.3rem] hover:bg-[#b00] cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400" onClick={logoutfunc}>LOG OUT</button></NavLink>) :
              (<NavLink to='/login'><button class="bg-[#a10202] text-white p-1 pl-1 pr-1 sm:p-2 md:pl-6 md:pr-6 rounded-[0.3rem] hover:bg-[#b00] cursor-pointer hover:shadow-2xl hover:-translate-y-0.5 transition ease-out duration-400" >LOG IN</button></NavLink>)}
            <NavLink to='/cart' class="relative">{({ isActive }) => (<><IoCartOutline className={`text-3xl cursor-pointer ${isActive ? "text-[#b00]" : ""}`}/><div className="absolute top-2 right-0 bg-[#b00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartproducts.length}</div></>)}</NavLink></div></div>

    {currentpath!=="/login" && <div class="flex p-2 md:pl-4 md:pr-4 bg-[#F0E4D3] w-full justify-between flex-wrap-reverse gap-4 sm:gap-8 pb-8 pt-8 absolute bottom-0 z-100 ">
      
              <div class="flex flex-col gap-4 flex-wrap ">
                <div class="flex items-center gap-2">
                  <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781164139/jwellary-logo_xrlsp5.png" class="h-10 w-14"></img>
                  <div class="font-semibold text-base md:text-lg">Luxora</div>
                </div>
                <div class="text-sm sm:text-base">Best Quality Jwellery</div>
                <div class="text-sm sm:text-base">Designed to inspire</div>
              </div>
      
              <div class="flex flex-col gap-2 text-sm sm:text-base">
                <div class="font-semibold">Shop</div>
                <div onClick={()=>{navigate('/collections',{state:{type:"Ring"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] " >Ring</div>
                <div onClick={()=>{navigate('/collections',{state:{type:"Necklace"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Neclace</div>
                <div onClick={()=>{navigate('/collections',{state:{type:"Bracelet"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Bracelet</div>
                <div onClick={()=>{navigate('/collections',{state:{type:"Earrings"}})}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Earring</div>
              </div> 
      
              <div class="flex flex-col gap-2 text-sm sm:text-base">
                <div class="font-semibold">About US</div>
                <div onClick={()=>{navigate('/contact')}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">Contact</div>
                <div onClick={()=>{navigate('/about')}} class="cursor-pointer hover:underline hover:text-[#a46b2c] ">About</div>
                <div>Carrers</div>
                <div>Blog</div>
              </div>
              <div class="flex flex-col gap-4 w-full md:w-auto">
                <div class="font-semibold text-center">Subscribe to our NewsLetter</div>
                <div>
                <input type="text" placeholder="Enter Your Email" class="border focus:outline-none h-8 border-r-0 rounded-l-lg p-0.5 w-[70%] sm:w-[80%] md:w-auto inline-block"></input>
                <button class="w-[24%] sm:w-[20%] h-8 md:w-22 bg-[#a46b2c] text-white rounded-r-lg ">Subscribe</button>
                </div>
                <div class="text-center">Get Updated Every Day</div>
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
