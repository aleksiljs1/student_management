"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { toast, ToastContainer } from "react-toastify";
import { urlConst } from "@/consts/path-consts";


type ClassData = {
  className: string;
  classYear: number;
  avgGpa: number;
};

const EditFaculties = () => {
  const { parseparams } = useParams();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [className, setClassName] = useState("");
  const [classYear, setClassYear] = useState("");
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`api/data/classes/view/faculty-class/${parseparams}`)
      .then((response) => {
        setClasses(response.data.classes);
      })
      .catch(() => {
        toast.error("Error fetching classes data");
      });
  }, [parseparams]);



  const handleSubmit = (e) => {
    e.preventDefault();


    const confirmSubmission = window.confirm(
      "Are you sure you want to edit this class?"
    );
    if (!confirmSubmission) return;

    axiosInstance
      .put(`api/data/classes/edit/${parseparams}`, {
        name: className,
        year: parseInt(classYear),
      })
      .then((response) => {
        alert(response.data.message);
        router.push(urlConst.dashboardRedirect);
      })
      .catch(() => {
        toast.error("Error updating class data");
      });
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="flex-items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-4xl font-bold text-violet-800 mb-3">
            Edit Classes
          </h2>
          <p className="font-light text-gray-500 mb-8">
            Input class details
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="class-name" className="mb-1 text-gray-700 font-medium">
                Class Name:
              </label>
              <input
                type="text"
                name="class-name"
                id="class-name"
                placeholder="Class Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="class-year" className="mb-1 text-gray-700 font-medium">
                Class Year:
              </label>
              <input
                type="number"
                name="class-year"
                id="class-year"
                placeholder="Class Year"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={classYear}
                onChange={(e) => setClassYear(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-4 bg-violet-600 text-white font-bold rounded-md hover:bg-violet-700 transition"
            >
              Submit
            </button>
          </form>

          <h3 className="text-2xl font-bold text-violet-800 mt-8">Existing Classes</h3>
          {classes.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {classes.map((classes, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-md shadow-md flex justify-between"
                >
    <span>
      {classes.className} - {classes.classYear}
    </span>
                  <span>GPA: {classes.avgGpa.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">No classes available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditFaculties;
