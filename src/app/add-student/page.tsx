"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlConst } from "@/consts/path-consts";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

const AddStudent = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [gpa, setGpa] = React.useState("");
  const [faculty, setFaculty] = useState([]);
  const [sendFaculty, setSendFaculty] = React.useState("");
  const [sendClasses, setSendClasses] = React.useState("");
  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();


  const handleSendClasses = (event )=> {
    setSendClasses(event.target.value);
  }
  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSendFaculty(event.target.value);
    axios
      .get(`${urlConst.baseURL}api/data/student-class/${event.target.value}`) //shorthand meth
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => {
        console.error("Error with getting class names data:", err);
        setError("Error getting class data.");
      });

  };//set classes to map based on faculty

  useEffect(() => {
    axios
      .get(`${urlConst.baseURL}api/data/faculty`, {
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
    if (!name || !surname || !gpa || !sendFaculty || !sendClasses) {
      setError("All fields are required.");
      return;
    }
console.log(sendClasses , "class names here are" ,classes);
    axios
      .post(`${urlConst.baseURL}api/data/create-student`, {
        Name: name,
        Surname: surname,
        gpa: gpa,
        faculty: sendFaculty,
        Classes: sendClasses,
      }) //self-explanatory
      .then(function (response) {
        alert(response.data.message);
        router.push(urlConst.dashboardRedirect);
      })
      .catch(function (error) {
        alert(error.response?.data.message || "Error submitting data.");
      });

  };

  return (
    <>
      <Header/>
      <div className=" flex-items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-4xl font-bold text-violet-800 mb-3">
            Add Student
          </h2>
          <p className="font-light text-gray-500 mb-8">input student details</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name.id"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="surname"
                className="mb-1 text-gray-700 font-medium"
              >
                Surname
              </label>
              <input
                type="text"
                name="surname"
                id="student-id"
                placeholder="Surname"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-gray-700 font-medium"
              >
                GPA
              </label>
              <input
                type="text"
                name="user"
                id="student-id"
                placeholder="Enter your gpa"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => setGpa(e.target.value)}
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

            <div className="flex flex-col">
              <label
                htmlFor="faculty"
                className="mb-1 text-gray-700 font-medium"
              >
                Class
              </label>
              <select
                id="faculty"
                className="border-gray-300 outline-black p-2 rounded-md"
                onChange={handleSendClasses}
              >
                <option value="">Select a Class</option>
                {classes.map((Classes: any) => (
                  <option key={Classes.id} value={Classes.id}>
                    {Classes.name} {Classes.year}
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

export default AddStudent;
