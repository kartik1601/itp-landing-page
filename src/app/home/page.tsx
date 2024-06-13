'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout Successful')
      router.push('/')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-700 to-gray-800 flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <nav className="w-full flex justify-between items-center p-5">
        <div className="text-2xl font-bold text-yellow-500">LIMSTIR-DTU</div>
        <button
          onClick={logout}
          className="text-white bg-red-700 focus:outline-none focus:ring-4 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 hover:text-red-500 hover:bg-white font-bold transition duration-300"
        >
          LOGOUT
        </button>
      </nav>
      <main className="flex flex-col items-center justify-center flex-1 w-full text-center px-20">
        <h1 className="text-6xl font-bold animate-fade-in-down">
          The Software <span className="text-yellow-300">Tools</span>
        </h1>
        <p className="mt-3 text-2xl animate-fade-in-up">
          Input to Output Image
        </p>
        <div className="flex flex-wrap justify-around items-center mt-6 w-full space-x-4 animate-fade-in-up">
          <Link href="/wire-coloring-code"
          className="bg-white text-black px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-green-200 font-bold">
              <Image src="/wire-coloring-code-logo.jpg" alt="Wire Coloring Code" width={240} height={240} className="mb-2"/>
              Wire Coloring Code
          </Link>
          <Link href="/bill-of-materials"
          className="bg-white text-black px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-300 font-bold">
              <Image src="/bill-of-materials-logo.png" alt="Bill of Materials" width={240} height={240} className="mb-2"/>
              Bill of Materials
          </Link>
        </div>
      </main>
      <footer className="w-full flex items-center justify-center p-4 bg-gray-800 text-white">
        &copy; {new Date().getFullYear()} LIMSTIR-DTU. All rights reserved.
      </footer>
    </div>
  )
}
