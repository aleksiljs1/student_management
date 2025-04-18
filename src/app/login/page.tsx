"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { urlConst } from "@/consts/path-consts";
import Header from "@/components/header";
import { axiosInstance } from "@/axios";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(urlConst.dashboardRedirect);
    }
  }, [router]);

  const sendToRegister = () => {
    router.push("/Register");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post(`/api/auth/login`, {
        userName,//email
        password,
      }) //shorthand method
      .then(function (response) {
        router.push(urlConst.dashboardRedirect);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
      })
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <h2 className="text-4xl font-bold text-violet-800 mb-3">Welcome</h2>
            <p className="font-light text-gray-500 mb-8">
              Please enter your details so we may verify your credentials!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="user"
                  className="mb-1 text-gray-700 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  placeholder="Enter your Email Address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-1 text-gray-700 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-500 mt-4">
              dont have an account?
              <span
                className="font-bold text-violet-600 hover:text-cyan-950 transition cursor-pointer"
                onClick={sendToRegister}
              >
                Sign up for free
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
