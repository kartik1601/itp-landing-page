'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, loginFailed] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      loginFailed(false);

      const response = await axios.post('/api/users/login', user);

      console.log('Login Success', response.data);

      router.push('/home');
    } catch (error: any) {
      setLoading(false);
      loginFailed(true);
      console.log('Login Failed');
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <h1 className="font-extrabold text-4xl sm:text-5xl mb-10 animate-fade-in-down">
        {loading ? 'Logging In...' : 'LOGIN'}{' '}
        <span className="text-red-500">{login ? 'Failed!' : ''}</span>
      </h1>

      {/* Divider */}
      <hr className="w-1/3 border-gray-600 mb-8 animate-fade-in" />

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

      {/* Login Button */}
      <button
        onClick={onLogin}
        className={`w-80 p-3 rounded-lg mb-4 font-bold text-white transition duration-300 ${
          buttonDisabled
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={buttonDisabled}
      >
        Login
      </button>

      {/* Alternative Options */}
      <h3 className="py-5 text-lg text-gray-300 animate-fade-in">OR</h3>

      {/* Sign-Up Button */}
      <Link
        href="/signup"
        className="w-80 text-center p-3 rounded-lg font-bold text-black bg-gradient-to-r from-gray-100 to-gray-300 hover:bg-gradient-to-l hover:from-yellow-200 hover:to-yellow-400 transition duration-300"
      >
        Sign-Up
      </Link>
    </div>
  );
}
