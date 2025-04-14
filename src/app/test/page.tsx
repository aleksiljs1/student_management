
"use client";
import StudentBoard from "@/components/student-board";
import "@radix-ui/themes/styles.css";
import React, { useEffect, useState } from "react";
import { urlConst } from "@/consts/path-consts";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios";
import Link from "next/link";

export default function Home() {
  const [hasFaculty, setHasFaculty] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [seeding, setSeeding] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const isThereData = async () => {
      try {
        const theData = await axiosInstance.get("/api/data/main");
        setHasFaculty(theData.data.hasFaculty);
      } catch (error) {
        console.error("Error checking faculty data:", error);
        setHasFaculty(false);
      } finally {
        setLoading(false);
      }
    };

    isThereData();
  }, []);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      await axiosInstance.post("/api/data/seed");

      window.location.reload();
    } catch (error) {
      console.error("Error seeding database:", error);
      setSeeding(false);
      alert("Failed to seed database. Please try again.");
    }
  };

  // Loading state
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

        <button > button</button>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
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
              <p className="text-gray-600 mb-6">
                Your database does not contain any faculty information. Please choose one of the options below to continue.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/faculties/create"
                className=" w-full py-3 px-4 text-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Create New Faculty
              </Link>

              <button
                onClick={handleSeedDatabase}
                disabled={seeding}
                className=" w-full py-3 px-4 text-center font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition duration-150 ease-in-out disabled:opacity-50"
              >
                {seeding ? (
                  <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

                  </svg>
                  Seeding Database...
                </span>
                ) : (
                  "Seed Database with Sample Data"
                )}
              </button>

              <div className="mt-6 text-center">
              </div>
            </div>
          </div>
        </div>

      </>);
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Faculty data exists! You can now use all features of the application.
            </p>
          </div>
        </div>
      </div>

      <StudentBoard />
    </div>

  );
}