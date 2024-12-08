'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);

      console.log('Signup Success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup Failed');
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      <div className='bg-opacity-30 backdrop-blur-xl rounded-xl p-8 flex flex-col items-center w-full sm:w-96 animate-fade-in-up'>
        {/* Title */}
        <h1 className='font-extrabold text-4xl text-yellow-300 mb-6 animate-fade-in-down'>
          {loading ? 'Signing Up...' : 'SIGN UP'}
        </h1>
        <hr className='w-full border-white mb-6' />

        {/* Username Input */}
        <label htmlFor='username' className='block text-lg mb-2 text-gray-300'>
          USERNAME
        </label>
        <input
          className='w-80 p-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-300'
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='Enter username'
          type='text'
        />

        {/* Email Input */}
        <label htmlFor="email" className="block text-lg mb-2 text-gray-300">
        EMAIL
        </label>
        <input
          className="w-80 p-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-300"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          type="email"
        />

        {/* Password Input */}
        <label htmlFor="password" className="block text-lg mb-2 text-gray-300">
          PASSWORD
        </label>
        <input
          className="w-80 p-3 mb-10 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition duration-300"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          type="password"
        />

        {/* Sign Up Button */}
        <button
        onClick={onSignup}
        className={`w-80 p-3 rounded-lg mb-4 font-bold text-white transition duration-300 ${
          buttonDisabled
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={buttonDisabled}
        >
          Sign-Up
        </button>

          {/* Alternative Options */}
        <h3 className="py-5 text-lg text-gray-300 animate-fade-in">OR</h3>

        {/* Sign-Up Button */}
        <Link
          href="/login"
          className="w-80 text-center p-3 rounded-lg font-bold text-black bg-gradient-to-r from-gray-100 to-gray-300 hover:bg-gradient-to-l hover:from-orange-300 hover:to-red-400 transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
