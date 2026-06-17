import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaQrcode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaCcVisa } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { LuShieldCheck } from "react-icons/lu";

import { FaCircleCheck, FaTag } from 'react-icons/fa6';
import { IoPricetag } from 'react-icons/io5';
import { GiPartyPopper } from 'react-icons/gi';
import { toast } from 'react-toastify';

const Cart = (props) => {
  const [cardtype, setcardtype] = useState('');
  const [paymentmethod, setpaymentmethod] = useState('card');
  const url = import.meta.env.VITE_APP_URL;
  const [showcheckout, setshowcheckout] = useState(false);
  const navigate = useNavigate();
  const [total, settotal] = useState(0);
  const { cartproducts, setcartproducts, liked, setliked } = props;
  console.log(cartproducts);
  function heartclick(prod) {
    setliked((prevliked) => {
      const already = prevliked.some((item) => item._id === prod._id);

      let updated;

      if (already) {
        updated = prevliked.filter((item) => item._id !== prod._id);
      } else {
        updated = [...prevliked, prod];
      }

      localStorage.setItem("wishlist", JSON.stringify(updated));

      return updated;
    });
  }
  
  function getCount(prod) {
    if (cartproducts.lenght === 0) { return 0; }
    const item = cartproducts.find((p) => p._id === prod._id);
    return item ? item.count : 0;
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
  
  useEffect(() => {
    const newTotal = cartproducts.reduce((acc, item) => acc + item.price * item.count, 0);
    settotal(newTotal);
  }, [cartproducts]);

  return (
    <div class="flex gap-8 pt-8 ml-[3%] mr-[3%] lg:flex-row flex-col pb-100 md:pb-64">
      <div class="flex flex-col gap-8 lg:w-[70%]">
        <div>
          <div class="text-2xl flex items-center gap-1 font-semibold " >Your Shopping Cart <hr class="border w-20 inline-block" /></div>
          <div class='mt-8 flex gap-8'>
            <div class='p-0.5 sm:p-4 pr-0 md:pr-4 border border-[#bebebe] flex flex-col gap-8 rounded-lg min-w-full h-full'>
              {
                cartproducts.map((prod) => {
                  return <div class="flex gap-4 pb-2 items-center">
                    <div class=" flex col-span-1 items-center">
                      <img src={prod.images[0].url} class="h-24 w-24 md:h-32 md:w-32 rounded-full shrink-0" />
                      
                    </div>
                    <div class=" flex flex-col items-start gap-2   flex-1">
                      
                      <h4 class='text-xl font-semibold'>{prod.name}</h4>
                      <div class="flex justify-between  items-center w-full">
                      <h4 class=' text-xl text-[#b00] font-semibold '>${prod.price}</h4>
                      <div class="flex gap-1 md:gap-3 place-self-end w-22 sm:w-26 md:w-30 sm:gap-6 items-center border-2 border-[#b00] p-1 justify-evenly rounded-lg self-center "><button onClick={() => changecart(prod, "remove")} class="cursor-pointer"><FaMinus class="text-[#b00]" /></button><p class="font-bold text-lg"> {getCount(prod, prod.selectedsize)} </p>
                        <button onClick={() => changecart(prod, "add")} class="cursor-pointer"><FaPlus class="text-[#b00]" /></button></div>
                        
                        <MdDelete class="text-black text-2xl cursor-pointer" onClick={() => changecart(prod, "clear")} />
                      </div>
                      </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <div class=" border border-[#bebebe] p-0.5 sm:p-2 flex flex-col gap-8 rounded-lg mb-8 ">
          <div class="text-3xl font-semibold p-2 mb-4 flex items-center gap-2 ">Wishlist <hr class="border w-20 inline-block" /></div>
          {liked.map((prod) => {
            return <div class="flex items-center gap-2 sm:gap-4 ">
              <div class="flex gap-2 md:gap-8 items-center">
                <img src={prod.images[0].url} class="h-20 w-20 md:h-32 md:w-32 rounded-full shrink-0" />
                
              </div>
              <div class="flex justify-start gap-2  flex-col flex-1">
                <h4 class='text-xl font-semibold'>{prod.name}</h4>
                <div class="flex justify-between w-full items-center">
                <h4 class='text-xl text-[#b00] font-semibold '>${prod.price}</h4>
                {cartproducts.some((item) => item._id === prod._id) ?
                  <button class="border-2 border-gray-500 p-1 pl-1 pr-1 text-gray-600 text-semibold rounded-lg  " onClick={() => changecart(prod, "add")}>Already In Cart</button> :
                  <button class="border-2 border-red-500 p-1 pl-1 pr-1 text-red-600 text-semibold rounded-lg cursor-pointer hover:text-[#b00] hover:border-[#b00] " onClick={() => changecart(prod, "add")}>Move To Cart</button>}
                  <button className="bg-[#FDE2E2] w-9 h-9 sm:w-11.5 sm:h-11.5 flex items-center justify-center z-50 right-4 top-4 text-3xl rounded-full cursor-pointer tr" onClick={(e) => { e.preventDefault(); heartclick(prod) }}>{liked && liked.some((item) => item._id === prod._id) ? <GoHeartFill class="clicked text-2xl" /> : <GoHeart />}</button>
              </div>
              </div>
            </div>
          })}
        </div>
      </div>
      <div class='mt-16 p-4 flex flex-col gap-4 border border-[#bebebe] h-max rounded-lg lg:w-[30%]'>
        <div class="flex flex-col gap-4 mb-4">
          <div class="mb-2 flex items-center gap-2 text-2xl font-semibold"><IoPricetag class="text-xl" />Coupon Code</div>
          <div class="flex gap-4 items-center"><input type="text" placeholder='Enter Coupon Code' class="border p-[0.3rem] pl-1 pr-1 rounded-md hover:outline-0 w-[80%]"></input><button class="cursor-pointer text-white bg-[#a46b2c] hover:bg-[#bf9a33] self-center rounded-lg hover:shadow-2xl w-[20%] h-9 hover:-translate-y-1 transition ease-out duration-400">Apply</button></div>
          <div class="flex gap-4 items-center text-green-700 font-semibold justify-between "><div class="flex items-center gap-1"><GiPartyPopper class="text-[#b00]" />FESTIVE 10%</div><div >-${total / 10}</div></div>
          <button class="flex justify-end -mt-4 -mb-4">Remove</button>
        </div>
        <hr />
        <div class='flex items-center gap-2 text-2xl font-semibold'>Price Details </div>
        <div class='flex justify-between font-semibold'><p>SubTotal</p><p>${total}</p></div>
        <div class='flex justify-between font-semibold'><p>Discount</p><p>${total / 10}</p></div>
        <div class='flex justify-between pb-4 border-b-2 border-dotted font-semibold'><p>Shipping Fee</p><p>$20</p></div>

        <div class='flex justify-between font-semibold text-xl text-[#a46b2c]'><p class="text-black">Total</p>${total - (total / 10) + 20}</div>
        <button class="h-12 w-full cursor-pointer text-white bg-[#a46b2c] hover:bg-[#bf9a33] self-center rounded-lg mt-4 hover:shadow-2xl hover:-translate-y-0.5 transition ease-out duration-200" onClick={() => setshowcheckout(true)} >Proceed To CheckOut</button>
        <div class="flex items-center justify-center gap-1 "><LuShieldCheck /><span>100% secure payment</span></div>
      </div>
      {showcheckout &&
        <>
          <div className="fixed inset-0 bg-black/50  z-[109]" onClick={() => setshowcheckout(false)} ></div>

          <div className=" w-full md:w-110 bg-white p-6 flex flex-col gap-4 absolute right-0 top-0 pl-8 pt-8 h-full ot-20 z-[110]">
            <div class="flex justify-between"><h2 className="font-semibold text-2xl">Checkout</h2><div onClick={()=>setshowcheckout(false)} class="text-xl font-bold cursor-pointer">X</div></div>

            <div className="mb-6 flex flex-col gap-4" >
              <div>Choose Payment Method</div>
              <div class="flex gap-8 mb-2">
                <span onClick={()=>setpaymentmethod('card')} className={` p-1 pl-3 pr-3 cursor-pointer rounded-lg ${paymentmethod==='card'?"border-2 border-yellow-400":"border border-[#bebebe]"}`}>Card</span>
                <span onClick={()=>setpaymentmethod('upi')} className={` p-1 pl-3 pr-3 cursor-pointer rounded-lg ${paymentmethod==='upi'?"border-2 border-yellow-400":"border border-[#bebebe]"}`}>Upi</span>
                <span onClick={()=>setpaymentmethod('netbanking')} className={` p-1 pl-3 pr-3 cursor-pointer rounded-lg ${paymentmethod==='netbanking'?"border-2 border-yellow-400":"border border-[#bebebe]"}`}>Netbanking</span>
                <span onClick={()=>setpaymentmethod('cod')} className={` p-1 pl-3 pr-3 cursor-pointer rounded-lg ${paymentmethod==='cod'?"border-2 border-yellow-400":"border border-[#bebebe]"}`}>Cod</span>
              </div>

              {paymentmethod === 'card' ?
                <div >
                  <p class="text-lg font-bold mb-4">Card</p>
                  <p className="text-sm mb-4">Select Card Type</p>
                  <div className="flex items-center gap-8 mb-4">
                    <span onClick={() => setcardtype("mastercard")} className={`text-lg p-1 pl-2 pr-2 ${cardtype === "mastercard" ? "bg-yellow-400 text-black border-yellow-400 rounded-lg  cursor-pointer" : ""}`}><RiMastercardFill /></span>
                    <span onClick={() => setcardtype("visa")} className={`text-md p-1 ${cardtype === "visa" ? "bg-yellow-400 text-black border-yellow-400  rounded-lg cursor-pointer" : ""}`}>VISA</span>
                    <span onClick={() => setcardtype("verve")} className={`text-md p-1 ${cardtype === "verve" ? "bg-yellow-400 text-black border-yellow-400  rounded-lg cursor-pointer" : ""}`}>Verve</span>
                  </div>
                  <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Card Number</p>
              <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-2">Expiry Date</p>
                <input type="text" placeholder="MM / YY" className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2" />
              </div>

              <div className="w-20">
                <p className="text-sm text-gray-400 mb-2">CVV</p>
                <input type="password" placeholder="***" className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2" />
              </div>
            </div>
                </div> : paymentmethod==='netbanking'?
                <div class="flex flex-col gap-4">
                  <div class="text-lg font-bold">Net Banking</div>
                  <div class="-mb-2">Select Your Bank</div>
                  <select class="border border-black w-full h-8 rounded-lg pl-2">
                    <option value="hdfc" >HDFC</option>
                    <option value="pnb">PNB</option>
                    <option value="kotak mahindra">KOTAK</option>
                    <option value="icici">ICICI</option>
                    <option value="sbi">SBI</option>
                    <option value="muthoot finance">MUTHOOT FINANCE</option>
                  </select>
                  <div class="grid grid-cols-2 grid-rows-3 gap-4">
                    <button className="border border-[#bebebe] rounded-lg p-1 text-left focus:outline-none focus:border-yellow-400 focus:border-2 cursor-pointer">SBI</button>
                    <button className="border border-[#bebebe] rounded-lg p-1 text-left focus:outline-none focus:border-yellow-400 focus:border-2 *:**:cursor-pointer">PNB</button>
                    <button className="border border-[#bebebe] rounded-lg p-1 text-left focus:outline-none focus:border-yellow-400 focus:border-2 cursor-pointer">ICICI</button>
                    <button className="border border-[#bebebe] rounded-lg p-1 text-left focus:outline-none focus:border-yellow-400  focus:border-2 cursor-pointer">HDFC</button>
                    <button className="border border-[#bebebe] rounded-lg p-1 text-left focus:outline-none focus:border-yellow-400 focus:border-2 cursor-pointer">KOTAK MAHINDRA</button>
                  </div>
                  <div class="text-gray-500 text-sm">**You will be redirected to your bank's secure website to complete payment**</div>
                </div>:paymentmethod==='upi'?
                <div class="flex flex-col gap-4">
                  <p class="text-lg font-bold">UPI</p>
                  <p>Scan QR Code using payment app</p>
                  <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781517536/qrcode_b8wcvj.png" alt="qr-img" class=" w-60 self-center"></img>
                  <p class="self-center border border-black w-max p-1 pl-4 pr-4 rounded-lg">luxora@okaxis</p>
                </div>:<div class="flex flex-col gap-4">
                  <p class="text-lg font-bold">Cash On Delivery</p>
                  <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781517536/cod_qg2l5u.jpg" alt="qr-img" class=" w-60 self-center rounded-full"></img>
                  <p class="self-center p-1 pl-4 pr-4 rounded-lg flex gap-2 items-center"><FaCircleCheck class="text-green-500 text-lg"/>Pay in cash when your order is delivered</p>
                  <p class="self-center p-1 pl-4 pr-4 rounded-lg flex gap-2 items-center"><FaCircleCheck class="text-green-500 text-lg"/>Please keep exact amount ready</p>

                  </div>}
            </div>

            
            <button className="mt-6 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition w-full cursor-pointer">Pay ${total}</button>
          </div>
        </>}

    </div>


  )
}

export default Cart

