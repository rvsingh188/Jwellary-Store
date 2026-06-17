import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import {IoLocationOutline, IoMapOutline, IoPersonOutline } from "react-icons/io5";
import { PiCity } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiCalendarDate, CiCreditCard1, CiMail } from "react-icons/ci";
import { RiMastercardFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
const Buynow = (props) => {
  const { products } = props;
  const { id } = useParams();
  const selectedproduct=products.filter((item) => item._id === id);

  return (
    <div className='mt-[4] mx-4 mb-100 md:mb-60 '>
      <h2 class="text-3xl font-bold my-4">Checkout</h2>
      <div className='grid lg:grid-cols-[2fr_1fr] gap-4 '>

        <div className='flex flex-col gap-8 w-full rounded-lg'>
          <div className='p-2 border border-[#bebebe] rounded-lg'>
            <h3 className='font-bold text-2xl flex items-center gap-2'><div className='bg-[#b00] text-white h-8 w-8 text-center rounded-full inline block px-2'>1</div>Shipping Address</h3>
            <form className='p-4 grid grid-cols-2 grid-rows-3 gap-x-8 gap-y-4 '>

              <div className="relative">
                <label class="text-[0.8rem] sm:text-base">Enter Your Full Name</label><br />
                <IoPersonOutline className='absolute left-1 top-8 text-xl'/>
                <input type="text" placeholder='Full Name' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Enter Your Address</label><br />
                <IoLocationOutline className='absolute left-1 top-8 text-xl' />
                <input type="text" placeholder='Address' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Enter Your City</label><br />
                <PiCity className="absolute left-1 top-8 text-xl" />
                <input type="text" placeholder='City' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Enter Your State</label><br />
                <IoMapOutline className='absolute left-1 top-8 text-xl' />
                <input type="text" placeholder='State' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Enter Your Country</label><br />
                <TbWorld className='absolute left-1 top-8 text-xl'/>
                <input type="text" placeholder='Country' required className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0'></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Enter Your Pincode</label><br />
                <CiMail className='absolute left-1 top-8 text-xl' />
                <input type="text" placeholder='Pincode' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
            </form>
          </div>
          <div className='p-2 border border-[#bebebe] rounded-lg'>
            <div className='flex items-center'>
              <span className='font-bold text-2xl flex items-center gap-2'><div className='bg-[#b00] text-white h-8 w-8 text-center rounded-full inline block px-2'>2</div>Payment Details</span>
              
            </div>
            <form className='p-4 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-4'>

              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Card Number</label><br/>
                <CiCreditCard1 className='absolute left-1 top-8 text-xl ' />
                <input type="text" placeholder='Card Number' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Card Holder Name</label><br/>
                <IoPersonOutline className='absolute left-1 top-8 text-xl '/>
                <input type="text" placeholder='Card Holder Name' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">Expiry Date</label><br/>
                <CiCalendarDate className='absolute left-1 top-8 text-xl' />
                <input type="text" placeholder='MM/YY' className='h-9 p-2 pl-8 border border-black rounded-lg w-full outline-0' required></input>
              </div>
              <div className='relative'>
                <label class="text-[0.9rem] sm:text-base">CVV</label><br/>
                <RiLockPasswordFill className="absolute left-1 top-8 text-xl" />
                <input type="password" placeholder='CVV' className='h-9 p-2 pl-6 border border-black rounded-lg w-full outline-0' required></input>
              </div>
            </form>
          </div>
        </div>
        <div className='border border-[#bebebe] w-full p-4 h-max rounded-lg'>
          <h3 className='font-bold text-2xl flex items-center gap-2' ><div className='bg-[#b00] text-white h-8 w-8 text-center rounded-full inline block px-2'>3</div>Order Summary</h3>
          <br />
          <div className='flex justify-center  gap-4 flex-col'>
            
              <div className='flex items-center justify-between gap-8'>
                <img src={selectedproduct[0].images[0].url} alt="prod-img" height={"100px"} width={"100px"}></img>
                <i className="text-base sm:text-lg">{selectedproduct[0].name}  x <b style={{ color: "brown" }}>1</b></i>
                <p style={{ color: "blue" }}>${selectedproduct[0].price }</p>
              </div>
            
          </div>
          <div className='flex justify-between w-full mt-4'><p>SubTotal</p><p>${selectedproduct[0].price}</p></div><hr />
          <div className='flex justify-between w-full mt-4'><p>Shipping Fee</p><p >$5</p></div><hr />
          <b className='flex justify-between w-full mt-4' style={{ color: "red" }}><p>Total</p>${selectedproduct[0].price + 5}</b>
          <button className='rounded-[0.3rem] bg-[#b00] hover:bg-[#a10202] cursor-pointer w-full mt-8 text-xl h-10 text-white'>Place Order</button>
        </div>

      </div>
    </div>
  )
}

export default Buynow
