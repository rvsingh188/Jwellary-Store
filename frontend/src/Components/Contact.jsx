import {React, useState }from 'react'
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
const Contact = () => {
  const[open,setopen]=useState(null);
  const qa=[
    {
      ques:"Are your diamonds and gemstones certified?",
      ans:"Yes. All our diamonds and precious gemstones are sourced from trusted suppliers and come with authenticity and quality certifications wherever applicable."
    },
    {
      ques:"Do you offer custom jewelry design services?",
      ans:"Absolutely. Our expert designers can create bespoke engagement rings, necklaces, bracelets, and other jewelry pieces tailored to your vision."
    },
    {
      ques:"How long does it take to create a custom piece?",
      ans:"Custom jewelry typically takes 2–6 weeks, depending on the complexity of the design and material availability."
    },
    {
      ques:"What materials do you use",
      ans:"We work with premium materials including 18K Gold, 22K Gold, Platinum, Sterling Silver, Diamonds, Emeralds, Rubies, and Sapphires."
    },
    {
      ques:"Do you provide jewelry resizing?",
      ans:"Yes. We offer professional ring resizing and adjustments for many of our jewelry pieces. Contact us for specific sizing requirements."
    }
  ]
  return (
    <div class='flex flex-col gap-12 p-4 md:p-16 pb-100 md:pb-80 lg:pb-60 '>
      <div class="flex flex-col lg:flex-row gap-12">
      <div class="w-full lg:w-[60%] h-[300px] md:h-[490px] rounded-lg flex gap-4 flex-col " >
        <div class="flex-[2]"><iframe title="Store Location" src="https://maps.google.com/maps?q=MG%20Road%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"width="100%" height="100%" style={{ border: 0 }} loading="lazy" /></div>
        <div class="flex flex-col flex-1 gap-4 flex-wrap ">
          <div class="flex justify-between gap-8 flex-wrap">
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none flex-wrap"><span class="font-semibold">Address: </span> 24 conduit mahatma gandhi road banglore</div>
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none"><span class="font-semibold">Phone: </span>981122200</div>
          </div>
          <div class="flex justify-between gap-8">
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none"><span class="font-semibold">Email: </span>luxora@gmail.com</div>
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none"><span class="font-semibold">Hours: </span>9am-6pm</div>
          </div>
          <div class="flex justify-between gap-8">
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none"><span class="font-semibold">Instagram: </span>our_luxora</div>
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none"><span class="font-semibold">Facebook: </span>our_luxora</div>
          </div>
        </div>
      </div>
    
    <form className='flex flex-col gap-4 p-4 md:pt-4  rounded-[0.3rem] w-full lg:w-[40%]  bg-[#faf0e6] '>
      <div class='text-3xl font-semibold text-center '>Send Us A Message</div>
          <div class=' flex flex-col md:flex-row  gap-4 md:gap-8'>
              <div class="flex-1">
                <label class="font-lg mb-[0.2rem]">Name</label>
                <input type="text" placeholder="Your Name" class="h-9 w-full rounded-lg p-0.5 pl-2 pr-2 border border-[#ddd] bg-white"></input>
              </div>
              <div class="flex-1">
                <label class="font-lg mb-[0.2rem]">Email</label>
                <input type="text" placeholder="Your Email" class="h-9 w-full rounded-lg p-0.5 pl-2 pr-2 border border-[#ddd] bg-white"></input>
              </div>
            </div>
            <div class=' flex flex-col md:flex-row  gap-4 md:gap-8'>
              <div class="flex-1">
                <label class="font-lg mb-[0.2rem]">City</label>
                <input type="text" placeholder="Your City" class="h-9 w-full rounded-lg p-0.5 pl-2 pr-2 border border-[#ddd] bg-white"></input>
              </div>
              <div class="flex-1">
                <label class="font-lg mb-[0.2rem]">Phone</label>
                <input type="text" placeholder="Your Phone" class="h-9 w-full rounded-lg p-0.5 pl-2 pr-2 border border-[#ddd] bg-white"></input>
              </div>
            </div>
            <div className='message-box'>
              <label class="font-lg mb-[0.2rem]">Message</label>
              <textarea placeholder='Your Message' class="h-40 w-full rounded-lg p-0.5 pl-2 pr-2 border border-[#ddd] bg-white"></textarea>

          </div>
        <button class="bg-[#a46b2c] p-2.5 pl-6 pr-6 rounded-[0.3rem] hover:bg-[#a46b5f] cursor-pointer text-white self-center text-center hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400">Send Message</button>
      </form>
      </div>
      <div class="flex gap-16 flex-col mt-10">
        <div class="text-4xl font-semibold text-center">Frequently Asked Questions</div>
        <div class="grid grid-cols-2 gap-8">
        {qa.map((faq,idx)=>{
          return <div className={`flex gap-2 flex-col p-2 rounded-lg  transition-all ease-in duration-300 `}>
            <div onClick={()=>{setopen(open===idx?null:idx)}} class="flex items-center gap-4 cursor-pointer text-xl hover:text-[#daa06d]"><span class="text-2xl font-semibold text-[#daa06d]">{open===idx?<CiCircleMinus />:<CiCirclePlus/>}</span>{faq.ques}</div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open === idx? "max-h-40 opacity-100 mt-4": "max-h-0 opacity-0"}`}>
            <div class="text-lg pl-8 bg-[#faf0e6] rounded-lg p-1 transition-all ease-in duration-500 ">{faq.ans}</div>
            </div>
          </div>
        })}
      </div>
      </div>
    </div>
  )
}

export default Contact
