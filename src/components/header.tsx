"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { urlConst } from "@/consts/path-consts";

function Header() {
  const router = useRouter();
  const sendToLogin = () => {
    router.push(urlConst.loginRedirect);
  };
  const sendToRegister = () => {
    router.push("/Register");
  };
  const sendToHome = () => {
    router.push(urlConst.dashboardRedirect);
  };
  const sendToAddUsers = () => {
    router.push("/add-student");
  };
  const sendToAddFaculties = () => {
    router.push("/add-faculty");
  };
  const sendToAddClasses = () => {
    router.push("/add-classes");
  };
  const deleteToken = () => {
    localStorage.clear();
    router.push(urlConst.loginRedirect);
  };
  const [HasTokken, setHasTokken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasTokken(!!token);
  }, [router]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center flex-1">
            <span className="text-2xl font-bold text-violet-600">UniHub</span>
          </div>

          <div className="hidden md:flex space-x-6 flex-1 justify-center">
            {HasTokken ? (
              <>
                <span
                  className="text-gray-600 hover:text-violet-600 transition cursor-pointer"
                  onClick={sendToHome}
                >
                  Home
                </span>
                <span
                  className="text-gray-600 hover:text-violet-600 transition cursor-pointer"
                  onClick={sendToAddUsers}
                >
                  Add Users
                </span>
                <span
                  className="text-gray-600 hover:text-violet-600 transition cursor-pointer"
                  onClick={sendToAddFaculties}
                >
                  Add Faculties
                </span>
                <span
                  className="text-gray-600 hover:text-violet-600 transition cursor-pointer"
                  onClick={sendToAddClasses}
                >
                  Add Class
                </span>
                <span
                  className="text-gray-600 hover:text-red-600 transition cursor-pointer"
                  onClick={deleteToken}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-gray-600 hover:text-violet-600 transition cursor-pointer"
                  onClick={sendToLogin}
                >
                  Login
                </span>
                <span
                  className="text-gray-600 hover:text-violet-600 transition cursor-pointer"
                  onClick={sendToRegister}
                >
                  Register
                </span>
              </>
            )}
          </div>
          <div className="hidden md:flex flex-1"></div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
