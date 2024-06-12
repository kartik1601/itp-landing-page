'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function VerifyEmail() {

    // const router = useRouter();

    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")

        // const {query} = router;
        // const urlToken = query.token;
        // setToken(urlToken || "")
    }, [])

    useEffect(()=>{
        setError(false)
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-3 bg-gray-900 text-white'>
          <h1 className='text-4xl font-bold mb-8'>VERIFY EMAIL</h1>
          <h2 className='p-2 bg-orange-500 text-black mb-8 font-bold'>{token ? `${token}` : "No Token"}</h2>
    
          {!verified && !error && (
            <button
              onClick={verifyUserEmail}
              className='bg-white text-red-500 py-2 px-4 border border-gray-300 rounded-3xl mb-4 focus:outline-none focus:border-gray-600 font-bold'
            >
              Verify Email
            </button>
          )}
    
          {verified && (
            <div className='text-center py-10'>
              <h2 className='font-bold text-2xl mb-4'>Email Verified Successfully</h2>
              <Link href='/login' className='bg-blue-500 text-white py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'>
                  Login
              </Link>
            </div>
          )}
    
          {error && (
            <div className='text-center'>
              <h2 className='text-red-500 text-2xl font-bold mb-4'>Error: Token Invalid</h2>
              <p className='text-gray-300'>Please check the token and try again.</p>
            </div>
          )}
        </div>
      );
}
