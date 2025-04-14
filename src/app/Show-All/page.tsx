"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import AllData from "@/components/all-data";
import CheckIfData from "@/components/check-data";

export default function Dashboard() {

  return (
    <>
      <CheckIfData>
      <ToastContainer />
      <Header />
      <AllData/>
      <Footer />
        </CheckIfData>
    </>
  );
}