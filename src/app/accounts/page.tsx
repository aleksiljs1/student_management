"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";

export default function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    checkAuth();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/accounts");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchInvites = async () => {
  //   try {
  //     const response = await axiosInstance.get("the link will be here")
  //
  //   } catch (error){
  //
  //   } finally {
  //
  //   }
  //
  // }

  const handleRoleUpdate = async (userId: number, newRole: string) => {
    try {
      await axiosInstance.put("/api/accounts/update-role", {
        userId,
        newRole
      });
      fetchUsers();
    } catch (error) {
      console.error("Role update failed:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/user/role/get");
      if (response.data.role !== "SUPERADMIN") {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-800 mb-6">Account Management</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-violet-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Invites</th>
              <th className="px-4 py-3 text-center">Update Role</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.inviteCount}</td>
                <td className="px-4 py-3 text-center">
                  <select
                    defaultValue={user.role}
                    onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                    className="bg-white border rounded px-3 py-1"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPERADMIN">SUPERADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}