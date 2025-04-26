'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const verifyEmailPage = () => {
  const router = useRouter();
  const [atoken,setToken] = useState({token : ''});

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken({...atoken,token:urlToken});
}, []);
  const verifytoken =async ()=>{
    try {
      console.log("token ===" ,atoken);
      toast.loading("please wait")
      const responce =await axios.post('/Api/Users/verifyemail',{token:"abhi"})
      console.log(responce)
      router.push("/login")
      
    } catch (error:any) {
       toast.error("your email was wrong")
    }
  }
  return (
    <div className='h-screen flex justify-center items-center text-center'>
      {/* <input type="text" placeholder='token from email' value={token} onChange={(e)=>{setToken(e.target.value)}}/> */}
      <button onClick={verifytoken}>verify</button>
      <Toaster/>
    </div>
  )
}

export default verifyEmailPage