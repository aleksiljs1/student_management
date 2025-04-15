"use client";
import React, { useEffect, useState } from "react";
import { urlConst } from "@/consts/path-consts";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { axiosInstance } from "@/axios";
import { ToastContainer, toast } from "react-toastify";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gpa, setGpa] = useState<number | "">("");
  const [faculty, setFaculty] = useState<{ id: number; name: string }[]>([]);
  const [sendFaculty, setSendFaculty] = useState("");
  const [sendClasses, setSendClasses] = useState("");
  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get(`/api/data/faculties/get/get-all-faculties`).then((response) => {
      setFaculty(response.data);
    });
  }, []);

  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSendFaculty(event.target.value);
    axiosInstance.get(`api/data/students/edit/student-class/${event.target.value}`).then((response) => {
      setClasses(response.data);
    });
  };

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]+$/;

    if (!name || !surname || gpa === "" || !sendFaculty || !sendClasses) {
      toast.error("All fields are required.");
      return false;
    }
    if (!nameRegex.test(name) || !nameRegex.test(surname)) {
      toast.error("Name and Surname must contain only letters.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInputs()) return;

    axiosInstance
      .post(`${urlConst.baseURL}api/data/students/add`, {
        Name: name,
        Surname: surname,
        gpa,
        faculty: sendFaculty,
        Classes: sendClasses,
      })
      .then(() => {
        toast.success("Student added successfully!");
        router.push(urlConst.dashboardRedirect);
      })
      .catch(() => toast.error("Error adding student."));
  };

  return (
    <>
      <ToastContainer />
      <Header />

        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-4xl font-bold text-violet-800 mb-3">Add Student</h2>
          <p className="font-light text-gray-500 mb-8">Input student details</p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="surname" className="mb-1 text-gray-700 font-medium">
                Surname
              </label>
              <input
                type="text"
                id="surname"
                placeholder="Surname"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gpa" className="mb-1 text-gray-700 font-medium">
                GPA
              </label>
              <input
                type="number"
                id="gpa"
                placeholder="Enter your GPA (0.1 - 4.0)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                min="0.1"
                max="4.0"
                step="0.1"
                onChange={(e) => setGpa(parseFloat(e.target.value) || "")}
                value={gpa}
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="faculty" className="mb-1 text-gray-700 font-medium">
                Assign to Faculty:
              </label>
              <select
                id="faculty"
                className="border-gray-300 outline-black p-2 rounded-md"
                onChange={handleFacultyChange}
              >
                <option value="">Select a Faculty</option>
                {faculty.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="class" className="mb-1 text-gray-700 font-medium">
                Class
              </label>
              <select
                id="class"
                className="border-gray-300 outline-black p-2 rounded-md"
                onChange={(e) => setSendClasses(e.target.value)}
              >
                <option value="">Select a Class</option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
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
      <Footer />
    </>
  );
};

export default AddStudent;
