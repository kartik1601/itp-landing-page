'use client';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout?' + new Date().getTime(), { withCredentials: true });

      console.log('Logout successful!');
      toast.success('Logout Successful');
      router.push('/');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const check = async () => {
    try {
      await axios.get('/api/users/home');
      toast.success('Welcome!');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
      router.push('/');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-gray-800 to-black text-white flex flex-col items-center min-h-screen">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-5 backdrop-blur-md bg-gray-900/70 shadow-md">
        <div className="text-2xl font-extrabold tracking-wide text-yellow-400">
          LIMSTIR-DTU
        </div>
        <button
          onClick={logout}
          className="text-sm font-bold text-white bg-red-600 px-5 py-2 rounded-lg shadow hover:bg-white hover:text-red-600 transition-all duration-300"
        >
          LOGOUT
        </button>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 w-full text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold animate-fade-in-down leading-tight">
          The <span className="text-sky-400">Software Tools</span>
        </h1>
        <p className="mt-4 text-lg sm:text-2xl font-bold animate-fade-in-up">
          Input to Output Processes
        </p>
        <div className="flex flex-wrap justify-center items-center mt-8 space-y-6 sm:space-y-0 sm:space-x-6">
          <Link
            href="/wire-coloring-code"
            className="bg-gradient-to-r from-gray-200 via-blue-500 to-gray-200 text-gray-900 px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 hover:from-sky-500 hover:via-blue-700 hover:to-sky-500 transition-all 
            hover:text-white duration-300 w-64 sm:w-72 text-center"
          >
            <Image
              src="/wire-coloring-code-logo.jpg"
              alt="Wire Coloring Code"
              width={200}
              height={200}
              className="mx-auto mb-3 rounded-lg"
            />
            <span className="text-lg font-semibold">Wire Coloring Code</span>
          </Link>
          <Link
            href="/bill-of-materials"
            className="bg-gradient-to-r from-gray-200 via-blue-500 to-gray-200 text-gray-900 px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 hover:from-sky-500 hover:via-blue-700 hover:to-sky-500 transition-all
            hover:text-white duration-300 w-64 sm:w-72 text-center"
          >
            <Image
              src="/bill-of-materials-logo.png"
              alt="Bill of Materials"
              width={200}
              height={200}
              className="mx-auto mb-3 rounded-lg"
            />
            <span className="text-lg font-semibold">Bill of Materials</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex items-center justify-center py-4 bg-gray-900/90 text-gray-400 text-sm shadow-inner">
        &copy; {new Date().getFullYear()} LIMSTIR-DTU. All rights reserved.
      </footer>
    </div>
  );
}
