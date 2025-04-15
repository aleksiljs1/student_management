"use client";

import "@radix-ui/themes/styles.css";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios";
import Link from "next/link";

export default function CheckIfData({children}: { children: ReactNode }) {
  const [hasFaculty, setHasFaculty] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [seeding, setSeeding] = useState<boolean>(false); // will do sth with seeding after
  const router = useRouter();

  const handleDataSeed =  async ()  => {
    try {
      setSeeding(true);
      await axiosInstance.post("/api/data/seed-database");
      router.refresh(); // SO he does not spam it as he waits and new data is displayed
    } catch (error) {
      console.error("Seeding failed", error);
      alert("Something went wrong while seeding.");
    } finally {
      setSeeding(false);
      router.refresh();
    }

  }
  useEffect(() => {
    if (hasFaculty) { // to be worked with
    }
  }, [hasFaculty, router]);

  useEffect(() => {
    const isThereData = async () => {
      try {
        const theData = await axiosInstance.get("/api/data/check-data");
        setHasFaculty(theData.data.hasFaculty);
      } catch (error) {
        console.error("Error checking faculty side-data:", error);
        setHasFaculty(false);
      } finally {
        setLoading(false);
      }
    };

    isThereData();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading application data...</p>
    </div>
    </div>
  );
  }


  if (!hasFaculty) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col gap-4">
      <div className="text-center ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-yellow-500 mx-auto mb-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    >
    <path
      strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
      </svg>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Faculty Data Found</h2>
    <p className="text-gray-800 mb-6">
      Your database does not contain any faculty information. Please choose one of the options below to continue.
    </p>

    </div>
    <div className="flex flex-col gap-4">
    <Link
      href="/faculties/add"
    className=" w-full py-3 px-4 text-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
      >
      Start by Creating a New Faculty
    </Link>

    <button
    onClick={handleDataSeed}
    className=" w-full py-3 px-4 text-center font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition duration-150 ease-in-out disabled:opacity-50"
      >
      Seed With Existing Dummy Data
    </button>
    </div>
    </div>
    </div>

    </>);
  }


  return children;

}