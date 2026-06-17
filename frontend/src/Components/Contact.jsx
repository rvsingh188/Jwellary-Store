import React from 'react'
const Contact = () => {
  return (
    <div class='flex flex-col lg:flex-row gap-12 p-4 md:p-16 pb-100 md:pb-80 lg:pb-60 '>

      <div class="w-full lg:w-[60%] h-[300px] md:h-[500px] rounded-lg flex gap-4 flex-col" >
        <div class="flex-[2]"><iframe title="Store Location" src="https://maps.google.com/maps?q=MG%20Road%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"width="100%" height="100%" style={{ border: 0 }} loading="lazy" /></div>
        <div class="flex flex-col flex-1 gap-4 ">
          <div class="flex justify-between gap-8">
          <div class="text-base md:text-lg lg:text-xl flex-1 sm:flex-none"><span class="font-semibold">Address: </span> 24 conduit mahatma gandhi road banglore</div>
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
    
    <form className='flex flex-col gap-4 md:gap-8 p-4 md:pt-8 md:pb-8 rounded-lg w-full lg:w-[40%]  bg-[#faf0e6] '>
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
                    <div className='message-box'>
                        <label class="font-lg mb-[0.2rem]">Message</label>
                        <textarea placeholder='Your Message' class="h-40 w-full rounded-lg p-0.5 pl-2 pr-2 border border-[#ddd] bg-white"></textarea>

                    </div>
                    <button class="bg-[#a46b2c] p-2.5 pl-6 pr-6 rounded-lg hover:bg-[#a46b5f] cursor-pointer text-white self-center text-center hover:shadow-2xl hover:-translate-y-1 transition ease-out duration-400">Send Message</button>
                </form>

                

    </div>
  )
}

export default Contact
