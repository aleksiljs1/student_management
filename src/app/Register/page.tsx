"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { router } from "next/client";
import {urlConst} from "@/consts/path-consts";
import Header from "@/components/header";

const SignIn = () => {
  const [userName, setUserName] = useState(""); //hook set up
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // useState hook
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(urlConst.registerUrl, {
        userName,
        password,
      }) //shorthand method
      .then(function (response) {
        alert(response.data.message);
        router.push("/login");
      })
      .catch(function (error) {
        alert(error.response?.data.message);
      }); // catching the corresponding errors
  };

  return (
      <>
      <Header/>
    <div className="signup-container">
      <h2 className="signup">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="username"
          required
          onChange={handleUserNameChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="password"
          required
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
      </>
  );
};

export default SignIn;
