"use client";
import StudentBoard from "@/components/student-board";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import React from "react";
import { urlConst } from "@/consts/path-consts";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  router.push(urlConst.dashboardRedirect);
  return;
  <StudentBoard />;
}
