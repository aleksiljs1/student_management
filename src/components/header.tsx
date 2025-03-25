"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { urlConst } from "@/consts/path-consts";
import Link from "next/link";

function Header() {
  const router = useRouter();

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
                <Link href={urlConst.dashboardRedirect} className="text-gray-600 hover:text-violet-600 transition">
                  Home
                </Link>
                <Link href={"/student-table"} className="text-gray-600 hover:text-violet-600 transition">
                  Show Students
                </Link>
                <Link href="/users/add" className="text-gray-600 hover:text-violet-600 transition">
                  Add Users
                </Link>
                <Link href="/faculties/add" className="text-gray-600 hover:text-violet-600 transition">
                  Add Faculties
                </Link>
                <Link href="/classes/add-classes" className="text-gray-600 hover:text-violet-600 transition">
                  Add Class
                </Link>
                <Link href={urlConst.loginRedirect} className="text-gray-600 hover:text-red-600 transition" onClick={deleteToken}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href={urlConst.loginRedirect} className="text-gray-600 hover:text-violet-600 transition">
                  Login
                </Link>
                <Link href="/Register" className="text-gray-600 hover:text-violet-600 transition">
                  Register
                </Link>
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
