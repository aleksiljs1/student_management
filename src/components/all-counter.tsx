"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { ToastContainer } from "react-toastify";


export default function Faculties() {
  const [stats, setStats] = useState<{ students: number; classes: number; faculties: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/data/graphs/side-data/count-alldata");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>



        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-violet-800 mb-4">Faculty Statistics Dashboard</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-800"></div>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Students</h3>
                <div className="text-3xl font-bold text-violet-800">{stats.students}</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Classes</h3>
                <div className="text-3xl font-bold text-violet-800">{stats.classes}</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Faculties</h3>
                <div className="text-3xl font-bold text-violet-800">{stats.faculties}</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-xl text-gray-600">No data available</div>
          )}
        </div>


    </>
  );
}
