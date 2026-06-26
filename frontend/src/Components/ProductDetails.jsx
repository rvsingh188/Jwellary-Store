import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaMinus, FaPlus, FaTruckMoving } from "react-icons/fa";
import { RiExchangeFundsFill } from "react-icons/ri";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCircleCheck } from 'react-icons/fa6';
const ProductDetails = (props) => {
  const navigate = useNavigate();
  const {products,loggedin,cartproducts,setcartproducts} = props;
  const url = import.meta.env.VITE_APP_URL;
  const { id } = useParams();
  const[showimage,setshowimage]=useState(false);
  const product = products.filter((item) => item._id === id);
  
  let discount=product[0].price*product[0].discount/100
  discount=Math.round(discount);
  const [selectedimage, setselectedimage] = useState(product[0].images[0].url);
  function getCount(prod) {
    if (cartproducts.lenght === 0) { return 0;}
    const item = cartproducts.find((p) => p._id === prod._id);
    return item ? item.count : 0;
  }
  function addtocart(){
    if(!loggedin){
      navigate('/login');
      return;
    }
    setshowimage(true);
    setTimeout(()=>{
      setshowimage(false)
    },2000)
  }
  const changecart = async (product, action) => {
    if(!loggedin){
      navigate('/login');
      return;
    }
    setcartproducts((prevCart) => {
      const existing = prevCart.find((p) => p._id === product._id);
      if (action === "add") {
        if (existing) {
          return prevCart.map((p) =>
            p._id === product._id ? { ...p, count: p.count + 1 } : p
          );
        } else {
          return [...prevCart, { ...product, count: 1 }];
        }
      }
      if (action === "remove") {
        if (existing && existing.count > 1) {
          return prevCart.map((p) =>
            p._id === product._id ? { ...p, count: p.count - 1 } : p
          );
        } else {
          return prevCart.filter((p) => !(p._id === product._id));
        }
      }
      return prevCart;
    });
    try {
      const endpoint = action === "add" ? "/api/v1/addproduct" : "/api/v1/deleteproduct";
      const response = await fetch(`${url}${endpoint}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product._id }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Backend failed to update");
      }

    } catch (error) {
      console.error(`Error syncing cart ${action}:`, error);
    }
  }
  return (
    <div class=" pt-12 flex flex-col  p-4 lg:flex-row md:gap-12 sm:pl-8 sm:pr-8  md:items-start md:pl-8 md:pr-8 lg:pl-12 lg:pr-12 bg-[#FFFCF7] pb-100 md:pb-64">
      <div class=" lg:max-w-[36rem] ">
        <img src={selectedimage} alt="prod-img" class="w-full xl:w-[36rem]  lg:h-[30rem] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] rounded-lg transition duration-400 ease hover:scale-[1.03]"></img>
        <div class="grid grid-cols-3 gap-4 mt-8">
          {product[0].images.map((prod_img)=>{
            return <img src={prod_img.url} alt="prod-img" class={` ${selectedimage === prod_img.url ? " border-orange-400 border-2" : ""} rounded-lg`} onClick={() => setselectedimage(prod_img.url)}></img>
          })}
          
        </div>
      </div>
      <div class="mt-8 flex flex-col gap-4.5 md:mt-0 pl-4 pr-4" >
        <div class="text-4xl font-semibold">{product[0].name} </div>
        <div className="stars product-details-stars -mt-4 flex items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={i <= product[0].rating ? "star filled" : "star"}>
              ★
            </span>
          ))}<span class="text-2xl">({product[0].rating}.0)</span>
        </div>

        <div class="text-3xl font-semibold flex gap-4">${product[0].price-discount}<del class="text-lg font-medium text-gray-500 mt-1">${discount}</del><span class="bg-red-600 text-white text-base p-1 pl-2 pr-2 rounded-lg">{product[0].discount}% off</span></div>
        <div class="text-base flex gap-2 sm:text-xl"><div class="font-semibold italic">Description: </div>{product[0].description}</div>
        <hr class="w-full h-0.5 text-gray-300 " />
        <div class="flex text-xl gap-16"><div class="font-mono w-30 text-red-800">Category: </div ><div class="font-medium">{product[0].category}</div></div>
        <div class="flex gap-16 text-xl "><div class="font-mono w-30 text-red-800">Gender: </div><div class="font-medium">{product[0].gender}</div></div>
        <div class="flex gap-16 text-xl"><div class="font-mono w-30 text-red-800">Occasion: </div><div class="font-medium">{product[0].occasion} </div></div>
        <div class="flex text-xl gap-16"><div class="font-mono w-30 text-red-800">Material: </div><div class=" font-medium">{product[0].material}</div></div>
        <div class="flex text-xl gap-16"><div class="font-mono w-30 text-red-800">Weight: </div><div class=" font-medium">{product[0].weight}</div></div>
 
 
        
              
        <hr class="w-full h-0.5 text-gray-300 -mb-2 " />
        <div class="text-xl list-disc"><div class="font-mono text-[#bb0019]">Features:</div>
          <div class="flex gap-4 flex-wrap justify-between">
            {product[0].features.map((feature) => {
              return <div class="flex gap-1 items-center"> <FaCircleCheck class="text-green-500 text-lg"/>{feature}</div>

            })}
          </div>
        </div>
        <hr class="w-full h-0.5 text-gray-300 " />
        <div class="flex gap-4 ">
        
          
          {getCount(product[0]) === 0 ? (
            <button class="bg-yellow-500 p-2.5 pl-10 pr-10 text-white rounded-[0.3rem] cursor-pointer hover:-translate-y-1 transition ease-out duration-400" onClick={() => { changecart(product[0], "add");addtocart();window.scrollTo(0, 0); }} >ADD TO CART</button>) :
            (<button class="bg-yellow-500 p-2.5 pl-10 pr-10 text-white rounded-[0.3rem] cursor-pointer hover:bg-amber-500 hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400" onClick={() => navigate('/cart')}>GO TO CART</button>)}
          <button class="p-2.5 pl-12 pr-12 border-2 border-yellow-500 text-yellow-500 rounded-[0.3rem] cursor-pointer hover:border-amber-500 hover:text-amber-500 hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400" >BUY NOW</button>
        </div>
        {showimage &&<img src={product[0].images[0].url} class="absolute top-60 right-2 h-14 w-14 rounded-lg animate-move-top"></img>}
      </div>
    </div>
  )
}

export default ProductDetails
