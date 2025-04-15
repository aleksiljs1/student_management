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
                <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">
                  Dashboard
                </Link>
                <div className="group relative">
                  <button className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">
                    Show
                  </button>
                  <div
                    className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white shadow-lg rounded-md p-2 space-y-1 z-10 w-48">

                    <div className="absolute h-2 w-full top-0 -translate-y-full"></div>
                    <a href="/faculties/view"
                       className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">Faculties</a>
                    <a href="/students/view"
                       className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">Students</a>
                    <a href="/Show-All"
                       className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">all</a>
                  </div>
                </div>
                <div className="group relative">
                  <button className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">
                    Add
                  </button>
                  <div
                    className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white shadow-lg rounded-md p-2 space-y-1 z-10 w-48">
                    {/* FUTURE ME DONT REMOVE THIS ITS THE BRIDGE , also need to remove block its unnececary*/}
                    <div className="absolute h-2 w-full top-0 -translate-y-full"></div>
                    <a href="/students/add"
                       className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">Add Students</a>
                    <a href="/faculties/add"
                       className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">Add Faculties</a>
                    <a href="/classes/add"
                       className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded">Add Class</a>
                  </div>
                </div>
                <Link href={urlConst.loginRedirect} className="block px-4 py-2 hover:bg-violet-50 text-gray-700 rounded"
                      onClick={deleteToken}>
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
