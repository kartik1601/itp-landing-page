import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-slate-900 p-8">
      <div className="text-center mb-16 animate-fade-in-down">
        <h1 className="text-6xl font-bold text-white mb-6">
          LIMSTIR-DTU & <span className="text-yellow-500">ITP-ELECTRONICS</span>
        </h1>
        <p className="text-4xl text-white font-bold">
          Project Overview
        </p>
      </div>

      <div className="flex space-x-8 mb-16">
        <div className="animate-fade-in-left">
          <Image
            src="/limstir.png"
            alt="Image 1"
            width={200}
            height={200}
            className="rounded-3xl shadow-2xl"
          />
        </div>
        <div className="animate-fade-in-right">
          <Image
            src="/itp.jpeg"
            alt="Image 2"
            width={200}
            height={200}
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      <div className="flex space-x-24 animate-fade-in">
        <Link href="/login" className="bg-white py-3 px-6 border border-gray-300 rounded-3xl focus:outline-none focus:border-gray-600 font-bold text-blue-500 hover:bg-gray-800 transition duration-300">
            Login
        </Link>

        <Link href="/signup" className="bg-yellow-500 py-3 px-6 border border-gray-300 rounded-3xl focus:outline-none focus:border-gray-600 font-bold text-black hover:bg-yellow-200 transition duration-300">
            Sign Up
        </Link>
      </div>
    </main>
  );
}
