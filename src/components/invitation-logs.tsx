"use client";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Search from "@/components/search";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useRouter, useSearchParams } from "next/navigation";


import CheckIfData from "@/components/check-data";
import { format, differenceInDays } from "date-fns";



export default function InvitationLogs() {
  const [invitationLogs, setInvitationLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    fetchInvitationLogs(currentPage, query);
  }, [currentPage, query]);

  const fetchInvitationLogs = async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/data/invitation-logs/view?page=${page}&query=${search}`
      );

      setInvitationLogs(response.data.data);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  }

  const handlePagination = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };





  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };


  const getStatusBadge = (log) => {
    const daysToUse = differenceInDays(new Date(log.usedAt), new Date(log.createdAt));

    if (daysToUse <= 1) {
      return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">Quick (1 day)</span>;
    } else if (daysToUse <= 3) {
      return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">Normal (2-3 days)</span>;
    } else {
      return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">Late ({daysToUse} days)</span>;
    }
  }

  return (
    <>
      <CheckIfData>
        <ToastContainer />
        <Header />
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-violet-800 mb-6">Invitation History</h1>

            <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
              <Search placeholder="Search invitations by email..." />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-800"></div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                      <tr className="bg-violet-800 text-white">
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Created By</th>
                        <th className="px-4 py-3 text-center">Created At</th>
                        <th className="px-4 py-3 text-center">Expires At</th>
                        <th className="px-4 py-3 text-center">Used At</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                      {invitationLogs.map((log: any, index: number) => (
                        <tr key={log.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 text-sm text-gray-700">{log.id}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{log.email}</td>
                          <td className="px-4 py-3 text-gray-700">{log.createdBy.username}</td>
                          <td className="px-4 py-3 text-center text-gray-700">{formatDate(log.createdAt)}</td>
                          <td className="px-4 py-3 text-center text-gray-700">{formatDate(log.expiresAt)}</td>
                          <td className="px-4 py-3 text-center text-gray-700">{formatDate(log.usedAt)}</td>
                          <td className="px-4 py-3 text-center">
                            {getStatusBadge(log)}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-center mt-4 gap-2">
                  <button
                    onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePagination(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </CheckIfData>
    </>
  );
}