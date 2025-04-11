"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import AllData from "@/components/all-data";

export default function Dashboard() {

  return (
    <>
      <ToastContainer />
      <Header />
      <AllData/>
      <Footer />
    </>
  );
}