"use client"
import React, { useEffect } from "react";
import axios from "axios";
import { urlConst } from "@/consts/path-consts";
import Header from "@/components/header";
import Footer from "@/components/footer";

const AddClass = () => {
  const [className, setClassName] = React.useState("");
  const [faculty, setFaculty] = React.useState([]);
  const [sendFaculty, setSendFaculty] = React.useState("");
  const [year, setYear] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleClassName=(event)=>{
    setClassName(event.target.value);
  }
  const handleYear = (event)=>{
    setYear(event.target.value);
  }
  const handleFacultyChange=(event)=>{
    setSendFaculty(event.target.value);
  }

  useEffect(() => {
    axios
      .get(`${urlConst.baseURL}/api/data/faculty`, {
        headers: {
          type: "faculty",
        },
      })
      .then((response) => {
        setFaculty(response.data);
      })
      .catch((err) => {
        console.error("Error with getting faculties:", err);
        setError("Error getting faculty data.");
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${urlConst.baseURL}api/data/create-class`, {
        className:className,
        sendFaculty:sendFaculty,
        year:year,
      }) //shorthand method
      .then(function (response) {
        alert(response.data.message);
        //router.push(urlConst.dashboardRedirect); do this but with class dashboard
      })
      .catch(function (error) {
        alert(error.response?.data.message || "Error submitting data.");
      });
    }
  return (
    <>
      <Header/>
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
                onChange={handleClassName}
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
                onChange={handleYear}
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
                onChange={handleFacultyChange}
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
    </>
  );
};

export default AddClass;

