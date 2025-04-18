"use client";
import React from "react";
import { useState,useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { urlConst } from "@/consts/path-consts";
import Header from "@/components/header";
import { ToastContainer } from "react-toastify";
import { axiosInstance } from "@/axios";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();


  const sendToLogin = () => {
    router.push(urlConst.loginRedirect);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = searchParams.get("token");
      console.log("token is ", token);
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await axiosInstance.get(`/api/auth/invintations/validate?token=${token}`);
        setValidToken(true);
      } catch (error) {

      }
      setLoading(false);
    };

    checkToken();
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post(urlConst.registerUrl, {
        userName,//email
        password,
      })
      .then(function (response) {
        alert("Registration successful!.");
        router.push(urlConst.loginRedirect);
      })
  };
  if (loading) {
    return <div>Loading...</div>; // will make the actual loading here
  }

  if (!validToken) {
    return (
      <>
        <ToastContainer />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-red-600">Access Restricted</h2>
            <p className="mt-4">You need a valid invitation link to register.</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>

      <ToastContainer />
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <h2 className="text-4xl font-bold text-violet-800 mb-3">
              Create an Account
            </h2>
            <p className="font-light text-gray-500 mb-8">
              Join us today! Fill in your details to sign up.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="mb-1 text-gray-700 font-medium"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Email"
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
                  placeholder="Create a password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-gray-500 mt-4">
              Already have an account?
              <span
                className="font-bold text-violet-600 hover:text-cyan-950 transition cursor-pointer"
                onClick={sendToLogin}
              >
                Log in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
