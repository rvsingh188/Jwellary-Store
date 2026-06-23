import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdSupportAgent } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { RiExchangeLine } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { GiIndiaGate } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { IoBulbSharp } from "react-icons/io5";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { motion } from "framer-motion";const About = () => {
  const timelineData = [
  {year: "2010",title: "The Beginning",desc: "A small studio with a big dream.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFg-mokrimNV6oghxkgSedwOsLDCeQF9rxg&s",},
  {year: "2013",title: "First Collection",desc: "Launched our first signature collection.",image:"https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/22136empire2/diamond/diamond-Brillant_AAA/stone2/diamond-Brillant_AAA/alloycolour/white.jpg",},
  {year: "2017",title: "Growing Trust", desc: "Expanded nationwide with loyal customers.", image:"https://emori.in/cdn/shop/files/R1365.1.webp?v=1752519225",},
  {year: "2021",title: "New Experience",desc: "Opened our flagship experience store.",image:"https://assets.architecturaldigest.in/photos/64f57391d03e7de005897abc/16:9/w_1616,h_909,c_limit/Untitled%20design%20(11).png",},
  {year: "2024",title: "Shining Ahead",desc: "Continuing to create timeless memories.",image:"https://ishhaara.com/cdn/shop/files/ishhaara-handmade-traditional-bridal-necklace-55456011200693.jpg?v=1728561258",},
];

  const data = [
  {
    image: "https://res.cloudinary.com/dfislatvt/image/upload/v1782198973/9a8f50fd-b487-4013-a334-a2120d198efb.png",
    title: "The Visionary Founder",
    desc: "A small studio with a big dream."
  },
  {
    image: "https://res.cloudinary.com/dfislatvt/image/upload/v1782196600/1f97a11e-b161-410b-98af-a17d8cfd4a13.png",
    title: "Lead Designer",
    desc: "Launched our first signature collection."
  },
  {
    image: "https://res.cloudinary.com/dfislatvt/image/upload/v1782196616/feb9876b-a0b8-42ef-a2c6-4ae9ba7f700c.png",
    title: "Gemstone Specalist",
    desc: "Expanded nationwide with loyal customers."
  },
  {
    image: "https://res.cloudinary.com/dfislatvt/image/upload/v1782196691/22e40701-b198-4d1c-a219-0a0ae95fe49c.png",
    title: "Quality Expert",
    desc: "Expanded nationwide with loyal customers."
  },
  {
    image: "https://res.cloudinary.com/dfislatvt/image/upload/v1782196747/fccc06cf-6ff2-4a6b-9f73-f7851ca06c10.png",
    title: "Managing Director",
    desc: "Expanded nationwide with loyal customers."
  }
];

  return (
    <div class="pt-20 flex gap-16 flex-col p-4 lg:p-12 bg-[#F5F0E8] pb-92  lg:pb-80 ">
      <div class="relative w-full">
        <div class="absolute -translate-x-1/4  -translate-y-1/2 top-1/2 left-1/4 ">
          <div class="text-3xl sm:text-5xl md:text-7xl mb-8 font-light font-serif">OUR STORY</div>
          <div class="text-sm sm:text-xl md:text-2xl ">A dedication to craft exceptional peices  </div>
          <div class="text-sm sm:text-xl md:text-2xl">foundation of passion, skill, and integrity</div>
        </div>
        <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781688804/46aae6be-2367-4a6e-abfc-c4c94517e197.png" class="h-100 object-cover w-full rounded-lg"></img>
      </div>
      <div class="flex flex-col lg:flex-row gap-8 md:gap-16 w-full pt-12">
        <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781510293/cd0f4ca4-a2fc-4171-8b56-f1cfe80f0be8.png" alt="about-img" class="shadow-xl md:flex-1 min-w-0 w-full h-100 rounded-[0.3rem] object-cover"></img>
        <div class="flex gap-4 flex-col md:flex-[2] min-w-0 w-full"> 
          <div class="text-3xl font-semibold text-red-600">About Luxora</div>
          <div class="md:text-lg lg:text-2xl">At Luxora Jewelry, we believe every piece of jewelry tells a story. Founded with a passion for timeless elegance and exceptional craftsmanship,
             we create designs that celebrate life's most precious moments.
          </div>
          <div class="md:text-lg lg:text-2xl">
            Our collections are thoughtfully crafted using high-quality materials, blending classic beauty with modern sophistication. From dazzling rings and
             elegant necklaces to stunning earrings and bracelets, every piece is designed to make you feel confident, beautiful,
             and unforgettable.
          </div>
          
        </div>
      </div>


      


      <div class="bg-[#EFE6DC] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center pt-2 mt-8 pb-2 gap-4 ">
        <div class="flex gap-3 items-center  items-self-center">
          <GoHeart class='text-3xl text-yellow-600' />
          <div>
            <div class="text-xl">Trusted By Thousands</div>
            <div>Happy Customers</div>
          </div>
        </div>
        
        <div class="flex gap-3 items-center items-self-center">
          <MdSupportAgent class='text-3xl text-yellow-600' />
          <div>
            <div class="text-xl">Dedicated Support</div>
            <div>We're Here For You</div>
          </div>
        </div>
        <div class="flex gap-3 items-center  items-self-center">
          <IoBagHandleSharp class='text-3xl text-yellow-600' />
          <div>
            <div class="text-xl">Fully Secure Shopping</div>
            <div>100% safe and secure</div>
          </div>
        </div>
        <div class="flex gap-3 items-center  items-self-center">
          <RiExchangeLine class='text-3xl text-yellow-600' />
          <div>
            <div class="text-xl">Hassle Free Returns</div>
            <div>Easy 7 day returns</div>
          </div>
        </div>
      </div>


        <div class="flex flex-col md:flex-row items-center gap-12  rounded-[0.3rem] border-[#C99A4A] p-2 mt-4">
          <motion.img src={"https://res.cloudinary.com/dfislatvt/image/upload/v1781778271/6db05e0c-84a7-4cf6-90a6-40008f319bdf.png" } initial={{opacity:0, rotate:10}}  whileInView={{opacity:1, rotate:[10,6,3,0]}} viewport={{once: false,amount: 0.3}}  transition={{ duration: 1.2 }}
           className={`w-full h-80 md:w-80 lg:w-120 lg:h-80 object-cover rounded-[0.3rem] p-1 border-2 border-[#C99A4A]`}></motion.img>
          <div class="flex gap-3 flex-col">
            <div class="text-4xl font-semibold text-red-600">Our Mission</div>
            <div class="md:text-lg lg:text-2xl">To create elegant, high-quality jewelry that inspires confidence and helps customers celebrate every meaningful moment in life.</div>
           
            <div class="md:text-lg lg:text-2xl">Our commitment is to provide customers with jewelry that not only enhances their style but also becomes a cherished part of their life's most meaningful moments.</div>
          </div>
        </div>
        



        

        <div class="flex flex-col md:flex-row items-center gap-12  rounded-[0.3rem] border-[#C99A4A] p-2 mt-4">
          
          <div class="flex gap-3 flex-col">
          <div class="text-4xl font-semibold text-red-600">Our Vision</div>
          <div class="md:text-lg lg:text-2xl">To be a trusted destination for timeless jewelry, known for exceptional craftsmanship, outstanding service, and lasting beauty.
          </div>
          <div class="md:text-lg lg:text-2xl">Through exceptional craftsmanship, ethical practices, and timeless design, we aim to build lasting relationships with our customers and create jewelry that is treasured today and passed down for generations to come.</div>
        </div>
        <motion.img  src={"https://res.cloudinary.com/dfislatvt/image/upload/v1781778188/70e246e6-591d-40a9-b571-091a5c4f5bd1.png"} className={`w-full h-80 md:w-80 lg:w-120 lg:h-80 border-2 border-[#C99A4A] p-1 object-cover rounded-[0.3rem]`} initial={{opacity:0, rotate:-10}}  whileInView={{opacity:1, rotate:[10,6,4,0]}} viewport={{once: false,amount: 0.3}}  transition={{ duration: 1.2 }}></motion.img>
      </div>

      <div>
        <div class="border-2 py-2 rounded-lg text-4xl text-[#A56A2A] flex items-center justify-center gap-4 my-12"><RiDoubleQuotesL class="mb-4 text-[#E7CDA5]"/> Every peice tells a story, Every design captures a moment <RiDoubleQuotesR class="mb-4 text-[#E7CDA5]"/></div>
        </div>
      <div className="max-w-8xl px-6 mt-12">
        <div className="mb-14">
          <p className="text-amber-600 uppercase tracking-[4px] text-sm">
            Our Journey
          </p>
          <h2 className="text-5xl font-serif mt-3">
            Milestones That Shaped Us
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-16 left-0 w-full h-[2px] bg-orange-300"></div>

          <div className="grid md:grid-cols-5 gap-12 relative">
            {timelineData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative z-10 w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src={item.image} alt={item.title}className="w-full h-full object-cover"/>
                </div>
                <div class="group cursor-pointer">
                <div className="w-4 h-4 border border-black group-hover:bg-amber-500 rounded-full mx-auto mt-4 animate-bounce group-hover:border-none"></div>
                 <div class="h-10 w-4 bg-linear-to-b from-[#0060] to-[#0066] rounded-[50%] blur-sm group-hover:from-orange-100 group-hover:to-orange-400 mx-auto"></div>
                </div>
                <h3 className="mt-4 text-amber-600 font-semibold">{item.year} </h3>

                <h4 className="text-lg font-semibold mt-2">{item.title}</h4>

                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      

      <div class="overflow-hidden flex w-full gap-5 mt-16">
          <div class="flex justify-center items-center gap-5 animate-marquee">
            {[...data].map((item)=>{
              return <div class="relative">
                <img src={item.image} alt="infint-image" class="min-h-80 min-w-60 sm:min-h-100 sm:min-w-80 rounded-lg object-cover"></img>
                <div class="absolute bottom-5 left-5 text-white text-3xl">{item.title}</div>
              </div>
            })}
          </div>
          <div class="flex justify-center items-center gap-5 animate-marquee ">
            {[...data].map((item)=>{
              return <div class="relative">
                <img src={item.image} alt="infint-image" class="min-h-80 min-w-60 sm:min-h-100 sm:min-w-80 rounded-lg object-cover"></img>
                <div class="absolute bottom-5 left-5 text-white text-3xl">{item.title}</div>
              </div>
            })}
          </div>
        </div>
    </div>
  )
}

export default About
