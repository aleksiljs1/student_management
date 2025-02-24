"use client";
import StudentBoard from "@/components/student-board";
import "./globals.css";
import "@radix-ui/themes/styles.css";

export default function Home() {
  return <>

    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">

          <div className="flex items-center flex-1">
            <span className="text-2xl font-bold text-violet-600">MyBrand</span>
          </div>


          <div className="hidden md:flex space-x-6 flex-1 justify-center">
            <a href="#" className="text-gray-600 hover:text-violet-600 transition">Home</a>
            <a href="#" className="text-gray-600 hover:text-violet-600 transition">About</a>
            <a href="#" className="text-gray-600 hover:text-violet-600 transition">Services</a>
            <a href="#" className="text-gray-600 hover:text-violet-600 transition">Contact</a>
          </div>


          <div className="hidden md:flex flex-1"></div>
        </div>
      </div>
    </nav>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >

        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-purple-800">Welcome</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome! Please enter your details so we may verify your credentials
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">

          </div>
          <button
            className="w-full bg-purple-800 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-purple-800 hover:border hover:border-gray-300"
          >
            Sign in
          </button>

          <div className="text-center text-gray-400">
            Dont have an account?
            <span className="font-bold text-black">Sign up for free</span>
          </div>
        </div>

      </div>
    </div>

  </>;
}
