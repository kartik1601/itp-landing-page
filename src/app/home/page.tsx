'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Home(){

  const router = useRouter();

  const logout = async () => {
    try {
      
      await axios.get('/api/users/logout')
      toast.success("Logout Successful")

      router.push('/')

    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className='bg-black flex flex-col items-center justify-center min-h-screen py-2 text-white'>
      <h1>LANDING PAGE</h1>
      <hr />
      <button 
        onClick={logout}
        className="text-white bg-red-700 focus:outline-none focus:ring-4 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 hover:text-red-500 hover:bg-white font-bold">
          LOGOUT
      </button>
    </div>
  )
}
