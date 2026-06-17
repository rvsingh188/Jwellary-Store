import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from "swiper/modules";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { SlBadge } from 'react-icons/sl';
import { IoBagHandleSharp } from 'react-icons/io5';
import { VscTriangleRight } from "react-icons/vsc";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";

const Home = (props) => {
  const[start,setstart]=useState(0);
  const navigate=useNavigate();
  const{products,liked, setliked}=props;
  const bestsellers = products.filter((product) => product.bestseller === true).slice(0, 4);
  const newarrivals = products.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);

  const cards = [
  {
    img:"https://res.cloudinary.com/dfislatvt/image/upload/v1781617866/3b4e8f29-af77-42e3-8034-212955c7c033.png"
  },
  {
    img:"https://res.cloudinary.com/dfislatvt/image/upload/v1781617832/ca9a49e0-2fe0-4e09-95b4-d1a3ba7c0797.png"
  },
  {
    img:"https://res.cloudinary.com/dfislatvt/image/upload/v1781617853/4c097d21-b59c-4a21-a212-62328b70a880.png"
  },
  {
    img:"https://res.cloudinary.com/dfislatvt/image/upload/v1781618208/675a94a2-eee3-4146-a534-00f82dd7efd0.png"
  },
  {
    img:"https://res.cloudinary.com/dfislatvt/image/upload/v1781618220/2a4c07c8-6675-4f74-bdc6-f0ed8fa32c91.png"
  }
];


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
  const getindex = (index) => {
  return (index + cards.length) % cards.length;
};
const next = () => {
  setstart((prev) => (prev + 1) % cards.length);
};

const prev = () => {
  setstart((prev) => (prev - 1 + cards.length) % cards.length);
};
useEffect(() => {
  const interval = setInterval(() => {
    setstart((prev) => (prev + 1) % cards.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);
  return (
    <div className="flex flex-col gap-20">
        <div className=" w-full -mb-22">
        <Swiper modules={[Autoplay]} autoplay={{delay:2000}} loop={true} className="w-full h-full">
      <SwiperSlide>
        <div class="relative">
          <div class="absolute top-[25%] sm:top-[28%] left-10 md:left-20 text-md sm:text-lg md:text-xl xl:text-2xl">Timeless Elegance</div>
        <div class="absolute top-[35%] left-10 md:left-20 z-10  text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#8b0000]">Handcrafted Jwellery </div>
        <div class="absolute  z-10 text-[#8b0000] left-10 md:left-20 top-[45%] text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"> For Every Moment</div>
        <button class="absolute top-[65%] z-10 p-1.5 pl-5 pr-5 md:p-2.5 md:pl-8 md:pr-8 bg-[#a10202] text-white sm:top-[60%] left-10 md:left-20 text-xl cursor-pointer hover:bg-[#b00] rounded-sm hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400" onClick={(e) => { e.preventDefault();  navigate('/collections'); }} >Shop Now</button>
        <img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1781166184/jwellery-home-hero_umgkou.png"} className="w-full object-cover h-60 sm:h-100 md:h-125 lg:h-150 xl:h-165"></img>
        </div>
      </SwiperSlide>
      <SwiperSlide >
        <div class="relative">
          <div class="absolute top-[25%] sm:top-[28%] left-10 md:left-20 text-md sm:text-lg md:text-xl xl:text-2xl">Timeless Elegance</div>
        <div class="absolute top-[35%] left-10 md:left-20 z-10  text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#8b0000]">For Every Moment </div>
        <div class="absolute  z-10 text-[#8b0000] left-10 md:left-20 top-[45%] text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"> Of Your Life</div>
        <button class="absolute top-[65%] z-10 p-1.5 pl-5 pr-5 md:p-2.5 md:pl-8 md:pr-8 bg-[#a10202] text-white sm:top-[60%] left-10 md:left-20 text-xl cursor-pointer hover:bg-[#b00] rounded-sm hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400" onClick={(e) => { e.preventDefault();  navigate('/collections'); }} >Shop Now</button>
        <img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1781166184/jwellery-home-hero-2_h4azom.png"} className="w-full object-cover h-60 sm:h-100 md:h-125 lg:h-150 xl:h-165"></img>
      </div>
      </SwiperSlide>
      </Swiper>
      </div>


      <div class="flex flex-col gap-12 bg-[#EFEAE4] w-full p-4  pt-12 pb-16">
        <p class="self-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Browse By Category</p>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 items-center">
          <div class="flex items-center flex-col gap-4 pt-4 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.05)] rounded-[0.3rem] bg-[#FAF9F6] cursor-pointer hover:scale-105 hover:-translate-y-1 transition ease-out duration-400" >
            <img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1780642052/16.2_csimxz.jpg"} class="rounded-full h-60 w-60"></img>
            <div class="flex items-center p-2 flex-col gap-2">
              <div class="text-2xl font-semibold">Earring</div>
              <button class="text-center text-lg flex gap-2 justify-center items-center cursor-pointer hover:text-red-600"  onClick={()=>{navigate('/collections',{state:{type:"Earrings"}})}}>Explore Now <FaArrowRightLong class="mt-1"/></button>
            </div>
          </div>
          <div class="flex items-center flex-col gap-4 pt-4 rounded-[0.3rem] shadow-[0_0_10px_5px_rgba(0,0,0,0.05)] pt-2 bg-[#FAF9F6] cursor-pointer hover:scale-105 hover:-translate-y-1 transition ease-out duration-400" >
            <img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1780640462/jwellary12.3_gwvtum.jpg"} class="rounded-full h-60 w-60"></img>
            <div class="flex items-center p-2 flex-col  gap-2">
              <div class="text-2xl font-semibold">Bracelet</div>
              <button class="text-center text-lg flex gap-2 justify-center items-center cursor-pointer hover:text-red-600"  onClick={()=>{navigate('/collections',{state:{type:"Bracelet"}})}}>Explore Now <FaArrowRightLong class="mt-1"/></button>             </div>
          </div>
          <div class="flex items-center flex-col gap-4 pt-4 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.05)] rounded-[0.3rem] pt-2 bg-[#FAF9F6] cursor-pointer hover:scale-105 hover:-translate-y-1 transition ease-out duration-400" >
            <img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1780640475/jwellary9.2_otzhhb.jpg"} class="rounded-full h-60 w-60"></img>
            <div class="flex items-center p-2 flex-col gap-2">
              <div class="text-2xl font-semibold">Necklace</div>
              <button class="text-center text-lg flex gap-2 justify-center items-center cursor-pointer hover:text-red-600"  onClick={()=>{navigate('/collections',{state:{type:"Necklace"}})}}> Explore Now <FaArrowRightLong class="mt-1"/></button>
            </div>
          </div>
          <div class="flex items-center flex-col pt-4 gap-4 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.05)] rounded-[0.3rem] pt-2 bg-[#FAF9F6]  hover:scale-105 hover:-translate-y-1 transition ease-out duration-400" >
            <img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1780638735/jwellary-2.1_zrb2xf.jpg"} class="rounded-full h-60 w-60"></img>
            <div class="flex items-center p-2 flex-col gap-2">
              <div class="text-2xl font-semibold">Ring</div>
              <button class="text-center text-lg flex gap-2 justify-center items-center cursor-pointer hover:text-red-600"  onClick={()=>{navigate('/collections',{state:{type:"Ring"}})}}>Explore Now <FaArrowRightLong class="mt-1"/></button>
            </div>
          </div>
          
        </div>
      </div>

      <div class="w-full  flex flex-col gap-6">
        <div class="text-2xl font-bold flex items-center self-center gap-4 text-[#A88550] "><hr class="w-8 inline-block" />New Arrivals<hr class="w-8 inline-block" /></div>
        <div class="text-4xl font-bold mb-4 self-center text-center" >Fresh Arrivals For You</div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-12 ml-4 mr-4 md:ml-16 md:mr-16 ">
          {newarrivals.map((prod) => {
            return <div class="rounded-[0.3rem] bg-[#F5F0EA] relative hover:shadow-2xl hover:scale-101">
              <button className="absolute bg-white p-1 z-50 right-4 top-4 text-2xl rounded-full cursor-pointer tr" onClick={(e) => { e.preventDefault(); heartclick(prod) }}>{liked && liked.some((item) => item._id === prod._id) ? <GoHeartFill class="clicked" /> : <GoHeart />}</button>
              <img src={prod.images[0].url} class="w-full h-84 rounded-t-lg"></img>
              <div class="flex flex-col p-2 gap-2">
                <div class="text-xl font-semibold ">{prod.name}</div>
                <div class="flex justify-between pr-2 text-lg font-semibold text-[#C99A4A]">
                  <div class="  ">${prod.price}</div>
                  <button class="flex gap-2 items-center  hover:text-[#febd14] cursor-pointer" onClick={(e) => { e.preventDefault(); navigate('/collections'); }} >Shop Now <FaArrowRightLong class="mt-1" /></button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>

      <div class=" relative w-full h-120">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex gap-4 flex-col">
          <div class="text-lg md:text-2xl text-[#C99A4A]">Timeless beauty</div>
          <div class="flex gap-2 flex-col">
            <div class="text-3xl md:text-5xl">Timeless Elegance</div>
            <div class="text-3xl md:text-5xl text-[#C99A4A]">Crafted For You</div>
          </div>
          <button class="mt-2 border-2 border-yellow-600 hover:border-yellow-700 text-yellow-600 text-lg h-10 w-30 rounded-[0.3rem] transition self-center cursor-pointer" onClick={(e) => { e.preventDefault();  navigate('/collections'); }}>Shop Now</button>
        </div>
        <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781176322/jwellary-banner_l2snfq.png" class="h-full w-full md:px-20 md:object-cover" ></img>
      </div>


      <div class="relative w-full flex items-center justify-center  px-2 md:px-4 lg:px-16">
        <button class="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-400 cursor-pointer text-2xl " onClick={prev} >&lt;</button>
      <div class=" relative flex justify-center items-center h-112 w-full">
        {[-1,0,1].map((pos)=>{
            const card = cards[getindex(start + pos)];
          
          return <div  className={`absolute w-[75vw] h-112 sm:w-[340px] md:w-80  rounded-lg shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] bg-white transition-all duration-500 ${pos === 0 ? "scale-100 z-20 opacity-100" : "hidden lg:block  scale-85 opacity-40 z-10"}`} style={{transform: `translateX(${pos * 320}px)`}}>
            <img src={card.img} alt="model-img" class="w-full h-full object-cover rounded-[0.3rem]"></img>
            
          </div>
        })}
      </div>
      <button class="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-400 cursor-pointer text-2xl " onClick={next}>&gt;</button>
      </div>


      <div class="w-full  flex flex-col gap-6 pb-64">
        <div class="text-2xl font-bold flex items-center self-center gap-4 text-[#A88550] "><hr class="w-8 inline-block" />Best Sellers<hr class="w-8 inline-block" /></div>
        <div className="text-4xl font-bold mb-4 self-center bestseller-heading text-center">Choose From The Bestsellers</div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-12 ml-4 mr-4 md:ml-16 md:mr-16">
          {bestsellers.map((prod) => {
            return <div class="rounded-lg bg-[#FAF8F5] relative hover:shadow-2xl hover:scale-101">
              <button className="absolute bg-white p-1 z-50 right-4 top-4 text-2xl rounded-full cursor-pointer tr" onClick={(e) => { e.preventDefault(); heartclick(prod) }}>{liked && liked.some((item) => item._id === prod._id) ? <GoHeartFill class="clicked" /> : <GoHeart />}</button>
              <img src={prod.images[0].url} class="w-full h-84 rounded-t-lg"></img>
              <div class="flex flex-col p-2 gap-2">
                <div class="text-xl font-semibold text-[#2B2520]">{prod.name}</div>
                <div class="flex justify-between pr-2 text-lg font-semibold text-[#C99A4A]">
                  <div >${prod.price}</div>
                  <button class="flex gap-2 items-center cursor-pointer hover:text-[#E0B15A]" onClick={(e) => { e.preventDefault();  navigate('/collections'); }} >Shop Now <FaArrowRightLong class="mt-1" /></button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>


    </div>
  )
}

export default Home
