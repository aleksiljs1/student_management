"use client"
import React, { useEffect } from "react";
import axios from "axios";
import { urlConst } from "@/consts/path-consts";

const AddFaculty = () => {
 const [faculty,setFaculty] = React.useState("");
 const [headOfFaculty,setHeadOfFaculty] = React.useState("");


 const handlefacultyname = (event) =>{
   setFaculty(event.target.value);
 }
 const handlefacultyHead = (event) =>{
   setHeadOfFaculty(event.target.value);
 }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/data/create-faculty", {
        facultyName:faculty,
        facultyHead:headOfFaculty,
      }) //shorthand method
      .then(function (response) {
        alert(response.data.message);
        //router.push(urlConst.dashboardRedirect); do this but with faculty dashboard
      })
      .catch(function (error) {
        alert(error.response?.data.message || "Error submitting data.");
      });
  }
  return (
    <>
      <div className=" flex-items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-4xl font-bold text-violet-800 mb-3">
            Add Faculty
          </h2>
          <p className="font-light text-gray-500 mb-8">input faculty details</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="surname"
                className="mb-1 text-gray-700 font-medium"
              >
                Faculty Name:
              </label>
              <input
                type="text"
                name="faculty-name"
                id="faculty-name"
                placeholder="Faculty Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={handlefacultyname}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
                Faculty Head Name/Surname
              </label>
              <input
                type="text"
                name="faculty-head"
                id="faculty-head"
                placeholder="Faculty Head Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={handlefacultyHead}
              />
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
    </>
  );
};

export default AddFaculty;

