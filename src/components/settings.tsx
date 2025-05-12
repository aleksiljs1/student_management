// app/settings/page.tsx
"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import Header from "@/components/header";
import { EditCredentialsModal } from "@/components/edit-credentials";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const [userData, setUserData] = useState<any>(null);
  const [logsData, setLogsData] = useState<any>({ data: [], totalPages: 1 });
  const [showEditModal, setShowEditModal] = useState(false);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, logsRes] = await Promise.all([
          axiosInstance.get("/api/auth/user"),
          axiosInstance.get(`/api/data/invitation-logs/user?page=${currentPage}`)
        ]);

        setUserData(userRes.data);
        setLogsData(logsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 ml-64">
        {/* Account Info Section (same as before) */}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-violet-800 mb-4">Invitation History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-violet-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Created At</th>
                <th className="px-4 py-3 text-left">Used At</th>
              </tr>
              </thead>
              <tbody>
              {logsData.data.map((log: any) => (
                <tr key={log.id} className="border-b">
                  <td className="px-4 py-3">{log.email}</td>
                  <td className="px-4 py-3">
                    {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="px-4 py-3">
                    {format(new Date(log.usedAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {logsData.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, logsData.totalPages))}
              disabled={currentPage === logsData.totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showEditModal && <EditCredentialsModal onClose={() => setShowEditModal(false)} />}
    </div>
  );
}