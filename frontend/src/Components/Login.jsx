import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = (props) => {
    const navigate=useNavigate();
    const url=import.meta.env.VITE_APP_URL;
    const[formdata,setformdata]=useState({"name":"","email":"","password":"","phone":""});
    const [newuser,setnewuser]=useState(true);
    const{loggedin,setloggedin,adminloggedin}=props;
    function changestate(){
        setnewuser((prev)=>!prev);
        setformdata({ name: "", email: "", password: "" ,phone:""});
    }
    function changeform(e){
        const{name,value}=e.target;
        setformdata((prev)=>({...prev,[name]:value}));
    }
    const submitform=async(e)=>{
        e.preventDefault();
        let res=null;
        const usermethod=newuser?"signup":"login";
        console.log(formdata);
          res=await fetch(`${url}/api/v1/${usermethod}`,{
            method:"POST",
            headers:{'Content-Type': 'application/json',},
            credentials:"include",
            body:JSON.stringify({email:formdata.email,password:formdata.password,name:formdata.name,phone:formdata.phone})
            })
            const data=await res.json();
            if(res.ok){
              toast.success(data.message);
              setloggedin(true);
              navigate('/');
            }
            else{
              toast.error(data.message);
            }
        
        
        setformdata({ name: "", email: "", password: "",phone:"" });
    }
    
  return (
    <div class="flex justify-center items-center min-h-screen  pt-4">
      <div class='flex flex-col md:flex-row gap-8 rounded-lg p-2 mx-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]' >
      <div class="relative">
      <div class="absolute top-[20%] left-[15%] text-center">
        <p class="text-2xl font-bold mb-4">{newuser?"Welcome To Luxora":"Welcome back"}</p>
        <p class="text-lg font-medium ">{newuser?"Signup To Find Best Jwellery":"Sign In To Continue In Luxora"}</p>
        <p class="text-lg font-medium ">and explore premium collection</p>
      </div>
      <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1781516595/3ec30a95-1642-44c0-be27-e8a518070976.png" alt='login-img'  class=" w-80 sm:w-88 h-100 md:w-100 md:h-120"></img>
      </div>
      <form class="flex flex-col gap-4 items-center justify-center" onSubmit={submitform}>
        <div class="text-3xl font-semibolds">{newuser?"Sign Up":"Login"}</div>
        {newuser && <div><label for='name'>Name</label><br/>
        <input type='text' value={formdata.name} name='name' placeholder='Enter Your Name' onChange={changeform} class="h-8 w-80 rounded-lg border focus:outline-0 focus:border-[#6F4E37] p-0.5" ></input></div>}
        <div>
        <label for="email">Email</label><br/>
        <input type="email" value={formdata.email} name="email" placeholder="Enter Your Email" onChange={changeform} class="h-8 w-80 rounded-lg border focus:outline-0 focus:border-[#6F4E37] p-0.5"></input>
        </div>
        {newuser && <div>
        
        <label for="phone">Phone Number</label><br/>
        <input type="text" value={formdata.phone} name="phone" placeholder="Enter Your Phone Number" onChange={changeform} class="h-8 w-80 rounded-lg border focus:outline-0 focus:border-[#6F4E37] p-0.5"></input>
        </div>}
        <div>
        <label for="password">Password</label><br/>
        <input type="password" value={formdata.password} name="password" placeholder="Enter Your Password" onChange={changeform} class="h-8 w-80 rounded-lg border focus:outline-0 focus:border-[#6F4E37] p-0.5"></input>
        </div>
        <button onClick={changestate} id="newuser" type="button" class=" text-[#6F4E37] self-end -mt-4 cursor-pointer" >{newuser?"Already Have An Account":"Create An Account"}</button>
        <button type="submit" class="p-2 pl-8 pr-8 bg-[#6F4E37] cursor-pointer text-white rounded-lg">{newuser?"Sign Up":"Log In"}</button>
      </form>
      </div>
    </div>
  )
}

export default Login