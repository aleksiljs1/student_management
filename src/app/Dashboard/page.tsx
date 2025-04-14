"use client";
import React, { useState, useEffect } from "react";
import FacultyStudentChart from "@/components/faculty-student-PieChart";
import FacultyClassChart from "@/components/faculty-class-PieChart";
import GpaDistributionChart from "@/components/gpa-distribution";
import GpaScatterPlot from "@/components/student-scatter-plot";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { axiosInstance } from "@/axios";
import CheckIfData from "@/components/check-data";

interface DashboardStats {
  students: number;
  classes: number;
  faculties: number;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/data/dashboard/charts/count-alldata",
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderStatCard = (
    title: string,
    value: number | undefined,
    icon: React.ReactNode,
    color: string,
  ) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color} `}>
      <div className="flex items-center justify-between">
        <div>
          <p className=" font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full `}>{icon}</div>
      </div>
    </div>
  );

  return (
    <CheckIfData>
      <div className="bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              University Statistics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Get insights into faculty, class, and student performance
            </p>
          </div>

          {/* Navigation, its solid for now but i might tweak it abit later */}
          <div className="mb-6">
            <nav className="flex space-x-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 "
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("faculty")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "faculty"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 "
                }`}
              >
                Faculty Analysis
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === "students"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 "
                }`}
              >
                Student Performance
              </button>
            </nav>
          </div>

          {/* animate-spin GOES HAAAAAAAAAAAAARD */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Overview , this is where the main content will go . PS, i should remember not to include everything here */}
          {!loading && activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats && (
                  <>
                    {renderStatCard(
                      "Total Students",
                      stats.students,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>,
                      "border-blue-500",
                    )}
                    {renderStatCard(
                      "Total Classes",
                      stats.classes,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>,
                      "border-green-500",
                    )}
                    {renderStatCard(
                      "Total Faculties",
                      stats.faculties,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>,
                      "border-purple-500",
                    )}
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="   ">
                  <FacultyStudentChart />
                </div>
                <div className="   ">
                  <FacultyClassChart />
                </div>
                <div className=" ">
                  <GpaDistributionChart />
                </div>
              </div>

              <div className=" shadow-md p-6 mb-8 ">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Student GPA Distribution
                </h3>
                <GpaScatterPlot />
              </div>
            </>
          )}

          {/* Faculty Analysis - will be where the faculty and classes data will go , students-by class is debatable will decide later */}
          {!loading && activeTab === "faculty" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FacultyStudentChart />
              <FacultyClassChart />

              {/* drop the gpas by classes thingy here*/}
            </div>
          )}

          {/* Student Performance - esenctially student specific data will go here , prolly my basic piue charts and the scatter , student by class is debatable */}
          {!loading && activeTab === "students" && (
            <div className="space-y-6">
              <div className="bg-white  shadow-md p-7">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  GPA Distribution
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    {" "}
                    {/* Fixes height issue, need another solution for later doe */}
                    <GpaDistributionChart />
                  </div>
                  <div className="bg-gray-50 p-6 ">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Key Findings
                    </h4>
                    <ul className="space-y-2  text-gray-600">
                      <li className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <span>
                          High performers (GPA &gt; 3.0) represent a significant
                          portion of students
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                        <span>
                          Average performers (GPA 2.0-3.0) make up the majority
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span>
                          Low performers (GPA &lt; 2.0) may need additional
                          support
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="  shadow-md p-6">
                <h3 className="text-lg font-semibold  mb-4">
                  Student Performance Analysis
                </h3>

                <GpaScatterPlot />
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </CheckIfData>
  );
};

export default Dashboard;
