"use client"
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { urlConst } from "@/consts/path-consts";
import { toast, ToastContainer } from "react-toastify";



const EditClass = () => {
  const { parseparams } = useParams();
  const [faculty, setFaculty] = useState([]);
  const [classes , setClasses] = useState("");
  const [year , setYear] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const router = useRouter();


  useEffect(() => {
    axiosInstance
      .get(`/api/data/faculty`)
      .then((response) => {
        setFaculty(response.data);
      })

  }, []);

  useEffect(() => {
    axiosInstance
      .get(`api/data/get-edit-class/${parseparams}`)
      .then((response) => {
        const facultiesData = response.data;
        setClasses(facultiesData.name);
        setYear(facultiesData.year);
        setFacultyId(facultiesData.faculty_id);
      })
  }, []);

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]+$/;

    if (!classes|| !facultyId || year === "" ) {
      toast.error("All fields are required.");
      return false;
    }
    if (!nameRegex.test(classes) ) {
      toast.error("Class name must contain only letters.");
      return false;
    }
    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    const confirmSubmission = window.confirm("Are you sure you want to edit this class?");
    if (!confirmSubmission) return;
    axiosInstance
      .put(`/api/data/classes/edit/${parseparams}`, {
        className: classes,
        year: year,
        faculty: facultyId,
      })
      .then(function() {
        router.push(urlConst.dashboardRedirect);
      })
  } // id needs to be send as a param not an object/with a variable in it
  return (<>
    <ToastContainer />
    <Header />
    <div className=" flex-items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center p-8 md:p-14">
        <h2 className="text-4xl font-bold text-violet-800 mb-3">
          Add New Class
        </h2>
        <p className="font-light text-gray-500 mb-8">input class details</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
              Class Name
            </label>
            <input
              type="text"
              name="class-name"
              id="class-name"
              placeholder="Class Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="surname"
              className="mb-1 text-gray-700 font-medium"
            >
              Class Year
            </label>
            <input
              type="year"
              name="year"
              id="year"
              placeholder="Year"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label
              htmlFor="faculty"
              className="mb-1 text-gray-700 font-medium"
            >
              Assign to Faculty:
            </label>
            <select
              id="faculty"
              className="border-gray-300 outline-black p-2 rounded-md"
              value = {facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
            >
              <option value="">Select a Faculty</option>
              {faculty.map((fac: any) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-violet-600 text-white font-bold rounded-md hover:bg-violet-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <Footer />

  </>)
}

export default EditClass;