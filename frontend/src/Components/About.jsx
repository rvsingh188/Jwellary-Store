import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdSupportAgent } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { RiExchangeLine } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { GiIndiaGate } from "react-icons/gi";
const About = () => {
  return (
    <div class="pt-12 flex gap-8 flex-col p-12 bg-[#F5F0E8]">
      <div class="relative w-full">
        <div class="absolute -translate-x-1/4  -translate-y-1/2 top-1/2 left-1/4 ">
          <div class="text-7xl mb-8 font-light font-serif">OUR STORY</div>
          <div class="text-2xl">A dedication to craft exceptional peices with a </div>
          <div class="text-2xl">foundation of passion, skill, and integrity</div>
        </div>
        <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781688804/46aae6be-2367-4a6e-abfc-c4c94517e197.png" class="h-100 object-cover w-full rounded-lg"></img>
      </div>
      <div class="flex flex-col lg:flex-row gap-8 w-full">
        <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781510293/cd0f4ca4-a2fc-4171-8b56-f1cfe80f0be8.png" alt="about-img" class="shadow-xl md:flex-1 min-w-0 w-full object-cover"></img>
        <div class="flex gap-4 flex-col md:flex-1 min-w-0 w-full"> 
          <div class="text-3xl font-semibold text-red-600">About Luxora</div>
          <div class="text-xl">At Luxora Jewelry, we believe every piece of jewelry tells a story. Founded with a passion for timeless elegance and exceptional craftsmanship,
             we create designs that celebrate life's most precious moments.
          </div>
          <div class="text-xl">
            Our collections are thoughtfully crafted using high-quality materials, blending classic beauty with modern sophistication. From dazzling rings and
             elegant necklaces to stunning earrings and bracelets, every piece is designed to make you feel confident, beautiful,
             and unforgettable.
          </div>
          <div class="text-2xl font-semibold mt-4 text-red-600">Our Mission</div>
          <div class="text-xl">To create elegant, high-quality jewelry that inspires confidence and helps customers celebrate every meaningful moment in life.</div>
          <div class="text-2xl font-semibold mt-4 text-red-600">Our Vision</div>
          <div class="text-xl">To be a trusted destination for timeless jewelry, known for exceptional craftsmanship, outstanding service, and lasting beauty.</div>
        </div>
      </div>

      <div class="bg-[#EFE6DC] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center pt-2 pb-2 gap-4 mb-88 md:mb-60">
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


    </div>
  )
}

export default About
