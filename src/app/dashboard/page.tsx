"use client";

import React from "react";
import "../globals.css";

import StudentBoard from "@/components/student-board";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <StudentBoard/>
    </div>
  );
};

export default Dashboard;
