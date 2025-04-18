"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { urlConst } from "@/consts/path-consts";
import Link from "next/link";
import { InvitationModal } from "@/components/invintation-modal";

function Header() {
  const router = useRouter();
  const [HasTokken, setHasTokken] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasTokken(!!token);
  }, [router]);

  const deleteToken = () => {
    localStorage.clear();
    router.push(urlConst.loginRedirect);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex">
      <nav className={`w-64 h-screen bg-white shadow-md p-4 fixed left-0 top-0 transition-transform duration-300 z-20 ${
        sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-violet-600">UniHub</div>

          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Collapse sidebar"
          >
            ◀
          </button>
        </div>

        {HasTokken ? (
          <div className="space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">
              Dashboard
            </Link>

            <button
              onClick={() => setShowOpen(!showOpen)}
              className="w-full text-left flex items-center justify-between px-4 py-2 hover:bg-violet-50 text-gray-700 rounded"
            >
              <span>Show</span>
              <span className="text-sm">{showOpen ? "▼" : "▶"}</span>
            </button>
            {showOpen && (
              <div className="ml-4 space-y-1">
                <Link href="/faculties/view" className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded">
                  Faculties
                </Link>
                <Link href="/students/view" className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded">
                  Students
                </Link>
                <Link href="/Show-All" className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded">
                  All
                </Link>
              </div>
            )}

            <button
              onClick={() => setAddOpen(!addOpen)}
              className="w-full text-left flex items-center justify-between px-4 py-2 hover:bg-violet-50 text-gray-700 rounded"
            >
              <span>Add</span>
              <span className="text-sm">{addOpen ? "▼" : "▶"}</span>
            </button>
            {addOpen && (
              <div className="ml-4 space-y-1">
                <Link href="/students/add" className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded">
                  Add Students
                </Link>
                <Link href="/faculties/add" className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded">
                  Add Faculties
                </Link>
                <Link href="/classes/add" className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded">
                  Add Class
                </Link>
                <button
                  onClick={() => {
                    setAddOpen(false);
                    setShowInvitationModal(true);
                  }}
                  className="block px-2 py-1 text-gray-600 hover:bg-violet-50 rounded"
                >
                  Send Invitation
                </button>
              </div>
            )}

            <button
              onClick={deleteToken}
              className="block w-full text-left px-4 py-2 hover:bg-violet-50 text-gray-700 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href={urlConst.loginRedirect} className="block text-gray-600 hover:text-violet-600">
              Login
            </Link>
            <Link href="/Register" className="block text-gray-600 hover:text-violet-600">
              Register
            </Link>
          </div>
        )}
      </nav>

      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-0 z-30 bg-white p-2 shadow-md rounded-r"
          aria-label="Expand sidebar"
        >
          ▶
        </button>
      )}

      <div className={`transition-all duration-300 p-4 w-full ${
        sidebarCollapsed ? "ml-0" : "ml-64"
      }`}>

      </div>
      {showInvitationModal && <InvitationModal onClose={() => setShowInvitationModal(false)} />}
    </div>
  );
}

export default Header;