import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdOutlineElectricBolt } from "react-icons/md";

import { GoHeart, GoHeartFill } from 'react-icons/go';
const Collections = (props) => {
  const url = import.meta.env.VITE_APP_URL;
  const location = useLocation();
  const type = location.state?.type;
  const navigate = useNavigate();
  const [pricethumb, setpricethumb] = useState(100000);
  const [relevance, setrelevance] = useState("featured");
  const [category, setcategory] = useState([]);
  const [material,setmaterial]=useState([]);
  const [sidebar, setsidebar] = useState(false);
  const { products, liked, setliked ,cartproducts,setcartproducts} = props;
  function heartclick(prod) {
    setliked((prevliked) => {
      const already = prevliked.some((item) => item._id === prod._id);

      let updated;

      if (already) {
        updated = prevliked.filter((item) => item._id !== prod._id);
      } else {
        updated = [...prevliked, prod];
      }

      localStorage.setItem("jwellery-wishlist", JSON.stringify(updated));

      return updated;
    });
  }
  
  function filteredresult() {
    let result = [...products];
    if (category.length > 0) {
      result = result.filter((prod) => category.includes(prod.category));
    }
    result = result.filter((prod) => prod.price <= pricethumb);
    if(material.length>0){
    result=result.filter((prod)=>material.includes(prod.material));
    }
    if (relevance === 'featured') { return result; }
    else if(relevance==="new-arrivals"){return result.sort((a, b) => new Date(a.date) - new Date(b.date))}
    else {
      result = result.filter((prod) => prod.bestseller === true);
    }
    return result;
  }
  function categoryselect(e) {
    setcategory((prev) => prev.includes(e.target.name) ? prev.filter((c) => c !== e.target.name) : [...prev, e.target.name]);
  }
  function materialselect(e) {
    setmaterial((prev) => prev.includes(e.target.name) ? prev.filter((c) => c !== e.target.name) : [...prev, e.target.name]);
  }


  const changecart = async (product, action) => {
    try {
      const endpoint = action === "add" ? "/api/v1/addproduct" : (action === "remove" ? "/api/v1/deleteproduct" : "/api/v1/clearproduct");
      const response = await fetch(`${url}${endpoint}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product._id }),
        credentials: 'include'
      });
      const result = await response.json();
      if (result.success === false) {
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
        if (action === "clear") {
          return prevCart.filter((p) => (p._id !== product._id));
        }
        return prevCart;
      });
    } catch (error) {
      console.error(`Error syncing cart ${action}:`, error);
    }

  }
  
  function getCount(prod){
  const item=cartproducts.find((p)=>p._id===prod._id );
  return item?item.count:0;
}

  useEffect(() => {
    if (type) {
      setcategory((prev) => {
        if (prev.includes(type)) return prev;
        return [...prev, type];
      });
    }
  }, [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
  },[location])
  
  
  return (
    <div className="flex gap-8 lg:pl-8 md:pr-8  pt-4 relative pb-130 md:pb-84 bg-[#FFFDF8]">
      {sidebar && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-99" onClick={() => { setsidebar(false) }}></div>
      )}
      <div className={`w-56 ${sidebar ? "show " : "close"} `}>
        <div class="text-3xl font-semibold mb-8" >Filters</div>
        <div className={`flex flex-col gap-2 border border-gray-300 p-4 rounded-[0.3rem] mb-8  bg-[#faebd7] `} >
          <div class="text-2xl font-semibold ">Fabric</div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer " id="ring" name="Ring" onClick={(e) => categoryselect(e)} checked={category.includes("Ring")}></input>
            <label className='font-semibold' htmlFor='ring' class="cursor-pointer font-semibold ">Ring</label>
          </div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer" id="necklace" name="Necklace" onClick={(e) => categoryselect(e)} checked={category.includes("Necklace")}></input>
            <label className='font-semibold' htmlFor='necklace' class="cursor-pointer font-semibold">Necklace</label>

          </div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer" id="bracelet" name="Bracelet" onClick={(e) => categoryselect(e)} checked={category.includes("Bracelet")}></input>
            <label className='font-semibold' htmlFor='bracelet' class="cursor-pointer font-semibold">Bracelet</label>

          </div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer" id="earrings" name="Earrings" onClick={(e) => categoryselect(e)} checked={category.includes("Earrings")}></input>
            <label className='font-semibold' htmlFor='earrings' class="cursor-pointer font-semibold">Earrings</label>
          </div>
          
        </div>


        <div className={`flex flex-col gap-2 border border-gray-300 p-4 rounded-[0.3rem] mb-8 bg-[#faebd7]  `} >
          <div class="text-2xl font-semibold ">Material</div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer " id="silver" name="Silver" onClick={(e) => materialselect(e)} checked={material.includes("Silver")}></input>
            <label className='font-semibold' htmlFor='silver' class="cursor-pointer font-semibold ">Silver</label>
          </div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer" id="gold" name="Gold" onClick={(e) => materialselect(e)} checked={material.includes("Gold")}></input>
            <label className='font-semibold' htmlFor='gold' class="cursor-pointer font-semibold">Gold</label>

          </div>
          <div>
            <input type='checkbox' class="mr-4 cursor-pointer" id="diamond" name="Diamond" onClick={(e) => materialselect(e)} checked={material.includes("Diamond")}></input>
            <label className='font-semibold' htmlFor='diamond' class="cursor-pointer font-semibold">Diamond</label>

          </div>
         
          
        </div>

        <div class="flex flex-col gap-4 border border-gray-300 p-4 rounded-[0.3rem] mb-8 bg-[#faebd7] ">
          <div class="text-2xl font-semibold " >Price Range</div>
          <input type="range" min={2000} max={200000} step={1000} value={pricethumb} onChange={(e) => { setpricethumb(e.target.value) }}></input>
          <div class="font-semibold">Min: <span class="text-[#c32148] ">2000</span></div>
          <div class="font-semibold">Max: <span class="text-[#c32148] ">{pricethumb}</span></div>
        </div>

        <div class="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg bg-[#faebd7] mb-8">
          <div class="text-2xl font-semibold ">Relevance</div>
          <select class="p-3 border rounded-lg" value={relevance}>
            <option value="featured" onClick={(e) => { setrelevance(e.target.value) }}>Featured</option>
            <option value="bestseller" onClick={(e) => { setrelevance(e.target.value) }}>Bestseller</option>
            <option value="new-arrivals" onClick={(e) => { setrelevance(e.target.value) }}>New Arrivals</option>
          </select>
        </div>

        


      </div>


      <div class="w-px bg-gray-300 mt-16 hidden lg:visible"></div>


      <div class="flex-1 px-4 md:px-8">
        <div class="flex justify-between items-center">
          <div class=" text-2xl sm:text-3xl font-semibold mb-8" >Collections {filteredresult().length > 0 ? `(${filteredresult().length} products)` : ""}</div>
          <button className="p-2 pl-8 pr-8 bg-[#8b0000] text-white cursor-pointer rounded-[0.3rem] text-xl filter-button" onClick={() => { setsidebar((prev) => !prev) }}>filters</button>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-12">
          {filteredresult().map((prod) => {
            
            let discount=(prod.price*prod.discount/100);
            discount=Math.round(discount);
            return <div class="rounded-lg bg-[#F5F0EA] relative">
              <p className='absolute top-1 left-2 bg-red-700 text-white z-50 p-1.5 pr-3 pl-3 rounded-lg'>{prod.discount}% <p>Off</p></p>
              <button className="absolute bg-white p-1 z-50 right-4 top-4 text-2xl rounded-full cursor-pointer tr" onClick={(e) => { e.preventDefault(); heartclick(prod) }}>{liked && liked.some((item) => item._id === prod._id) ? <GoHeartFill class="clicked" /> : <GoHeart />}</button>
              <img src={prod.images[0].url} class="w-full h-88 rounded-t-lg transition duration-300 ease hover:scale-y-[1.03]"></img>
              <div class="flex flex-col p-2 ">
                <div class="text-xl font-semibold mb-3">{prod.name}</div>
                <div className="stars product-details-stars -mt-4 flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={i <= prod.rating ? "star filled" : "star"}>
                      ★
                    </span>
                  ))}<span class="text-xl">({prod.rating}.0)</span>
                </div>
                <div><del class="text-gray-600">${(prod.price)}</del> <span class="font-semibold text-[#2C2C2C] text-xl">${prod.price-discount}</span></div>
                <div class="flex justify-between ">
                <button class="flex gap-2 items-center text-[#a46b2c] hover:text-[#6F4E37] cursor-pointer text-lg md:text-xl mr-2 font-semibold self-end mt-2" onClick={(e) => { e.preventDefault(); navigate(`/product-details/${prod._id}`); }}>View Details <FaArrowRightLong class="mt-1" /></button>

              <button class="flex gap-2 flex items-center bg-[#a46b2c] px-2 py-1 rounded-[0.3rem] hover:bg-[#6F4E37] text-white cursor-pointer text-lg md:text-xl mr-2 font-semibold self-end mt-2 " onClick={(e) => { e.preventDefault(); navigate(`/buy-now/${prod._id}`); }}>Buy Now <MdOutlineElectricBolt /></button>

                  
              </div>
                </div>
                

            </div>
          })}
        </div>
      </div>
      {/*
      {
                  getCount(prod)==0?<button onClick={() => changecart(prod, "add")} class="bg-[#a46b2c] p-1.5 rounded-lg text-white hover:bg-[#6F4E37] cursor-pointer text-lg  mr-2 font-semibold"> Add To Cart</button>:
                  <div class="flex gap-1 md:gap-3 place-self-end w-22 sm:w-26 md:w-30 sm:gap-6 items-center border-2 border-[#b00] p-1 justify-evenly rounded-lg ">
                    <button onClick={() => changecart(prod, "remove")} class="cursor-pointer"><FaMinus class="text-[#b00]" /></button>
                    <p class="font-bold text-lg"> {getCount(prod)} </p>
                    <button onClick={() => changecart(prod, "add")} class="cursor-pointer"><FaPlus class="text-[#b00]" /></button>
                  </div>
                  }
      */ }
    </div>
  )
}

export default Collections