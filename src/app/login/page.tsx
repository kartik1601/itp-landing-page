'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false)
  const [login, loginFailed] = useState(false)

  const onLogin = async () => {
    try {
      
      setLoading(true)
      loginFailed(false)

      const response = await axios.post("/api/users/login", user)

      console.log("Login Success", response.data)

      router.push('/home')


    } catch (error:any) {
      setLoading(false)
      loginFailed(true)
      console.log("Login Failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 text-gray-800'>
      <h1 className='font-bold py-10 text-3xl'>
        {loading ? "Loading... " : "LOGIN "} 
        <span className='text-3xl text-red-500'>{login ? " Failed! " : ""}</span>
      </h1>

      <hr className='w-1/2 border-gray-300 mb-8' />
      <label htmlFor="email" className='block text-lg mb-2'>EMAIL</label>
      <input 
        className='w-80 p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        type="text"
      />
      <label htmlFor="password" className='block text-lg mb-2'>PASSWORD</label>
      <input 
        className='w-80 p-2 mb-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        type="password"
      />

      <button
        onClick={onLogin}
        className={`${buttonDisabled ? 'bg-slate-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} w-80 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 font-bold text-white transition duration-300`}
        disabled={buttonDisabled}
      >
        Login
      </button>

      <h3 className='py-5 text-lg'>OR</h3>

      <Link href='/signup' className='w-80 text-center bg-slate-100 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-800 font-bold hover:bg-gray-200 transition duration-300'>
          Sign-Up
      </Link>
    </div>
  );
}