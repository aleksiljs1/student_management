"use client";
import StudentBoard from "@/components/student-board";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckIfData from "@/components/check-data";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <CheckIfData>
      <div>Redirecting...</div>
    </CheckIfData>
  );
}
