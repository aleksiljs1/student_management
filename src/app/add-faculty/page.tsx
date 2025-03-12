"use client";
import React, { useEffect } from "react";
import { urlConst } from "@/consts/path-consts";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { axiosInstance } from "@/axios";

const AddFaculty = () => {
  const [faculty, setFaculty] = React.useState("");
  const [headOfFaculty, setHeadOfFaculty] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post(`api/data/create-faculty`, {
        facultyName: faculty,
        facultyHead: headOfFaculty,
      })
      .then(function (response) {
        alert(response.data.message);
        //router.push(urlConst.dashboardRedirect); do this but with faculty dashboard
      })
      .catch(function (err) {
        alert(err.response?.data.message || "Error submitting data.");
      });
  };
  return (
    <>
      <Header />
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
                onChange={(e) => setFaculty(e.target.value)}
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
                onChange={(e) => setHeadOfFaculty(e.target.value)}
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
      <Footer />
    </>
  );
};

export default AddFaculty;
