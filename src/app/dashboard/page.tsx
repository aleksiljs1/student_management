"use client";
import React, { useEffect } from "react";
import "../globals.css";

import StudentBoard from "@/components/student-board";
import { useRouter } from "next/navigation";
import {urlConst} from "@/consts/path-consts";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(urlConst.loginRedirect);
    }
  }, [router]); //listen to router
  return (
    <div className="dashboard">
      <StudentBoard />
    </div>
  );
};

export default Dashboard;
