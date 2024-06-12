'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SingupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      
      setLoading(true)
      
      const response = await axios.post("/api/users/signup", user)

      console.log("Signup Success", response.data)

      router.push('/login')


    } catch (error:any) {
      console.log("Signup Failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex items-center justify-center min-h-screen py-2 bg-gray-900 text-white'>
      <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-xl p-8 flex flex-col items-center'>
        <h1 className='font-bold py-6 text-3xl text-yellow-500'>{loading ? "Processing" : "SIGN UP"}</h1>
        <hr className='w-full border-white mb-6' />
        <label htmlFor="username" className='block text-lg mb-2 text-white font-bold'>USERNAME</label>
        <input 
          className='w-72 p-2 mb-4 border border-white rounded-3xl focus:outline-none focus:border-yellow-500 bg-transparent text-white'
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='username'
          type="text"
        />
        <label htmlFor="email" className='block text-lg mb-2 text-white font-bold'>EMAIL</label>
        <input 
          className='w-72 p-2 mb-4 border border-white rounded-3xl focus:outline-none focus:border-yellow-500 bg-transparent text-white'
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
          type="text"
        />
        <label htmlFor="password" className='block text-lg mb-2 text-white font-bold'>PASSWORD</label>
        <input 
          className='w-72 p-2 mb-6 border border-white rounded-3xl focus:outline-none focus:border-yellow-500 bg-transparent text-white'
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
          type="password"
        />

        <button
          onClick={onSignup}
          className={`${buttonDisabled ? 'bg-slate-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-gray-200'} w-72 p-2 border border-white rounded-3xl mb-1 focus:outline-none focus:border-gray-600 font-bold transition duration-300`}
          disabled={buttonDisabled}
        >
          Sign-Up
        </button>

        <h3 className='py-5 text-lg font-bold'>OR</h3>

        <Link href='/login' className='bg-white text-red-500 p-2 border border-white rounded-3xl focus:outline-none focus:border-gray-600 font-bold hover:bg-gray-200 transition duration-300 w-72 text-center'>
          Login
        </Link>
      </div>
    </div>
  );
}