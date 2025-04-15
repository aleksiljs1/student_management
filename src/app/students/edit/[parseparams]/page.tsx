"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { urlConst } from "@/consts/path-consts";
import Header from "@/components/header";
import { axiosInstance } from "@/axios";
import { toast, ToastContainer } from "react-toastify";

const EditStudent = () => {
  const { parseparams } = useParams();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gpa, setGpa] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
  const [classId, setClassId] = useState("");

  const [sendFaculty, setSendFaculty] = useState("");
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`api/data/students/edit/get-edit/${parseparams}`)
      .then((response) => {
        const studentData = response.data;
        setName(studentData.name);
        setSurname(studentData.surname);
        setGpa(studentData.gpa);
        setFacultyId(studentData.faculty_id);
        setClassId(studentData.student_class_id);
      })
  }, []);
  useEffect(() => {
    axiosInstance
      .get(`/api/data/faculties/get/get-all-faculties`)
      .then((response) => {
        setFaculties(response.data );
      })


  }, []);
  const handleFacultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSendFaculty(event.target.value);
    setClasses([]);
    setClassId("");
    //reset class id and classes after the change , it will set it back anyway when i set class
    axiosInstance
      .get(`api/data/students/edit/student-class/${event.target.value}`)
      .then((response) => {
        setClasses(response.data);
      })
  };
  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]+$/;

    if (!name || !surname || gpa === "" || !sendFaculty || !classId) {
      toast.error("All fields are required.");
      return false;
    }
    if (!nameRegex.test(name) || !nameRegex.test(surname)) {
      toast.error("Name and Surname must contain only letters.");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (facultyId === "") {
      return;
    }
    setSendFaculty(facultyId);
    axiosInstance
      .get(`api/data/students/edit/student-class/${facultyId}`)
      .then((response) => {
        setClasses(response.data);
      })
  }, [facultyId]);

  const sendClassesChange = (event) => {
    setClassId(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const confirmSubmission = window.confirm("Are you sure you want to edit this student?");
    if (!confirmSubmission) return;
    axiosInstance
      .put(`api/data/students/edit/${parseparams}`, {
        Name: name,
        Surname: surname,
        gpa: gpa,
        faculty: sendFaculty,
        Classes: classId,
      })
      .then(function () {
        router.push(urlConst.dashboardRedirect);
      })
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <div className=" flex-items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 className="text-4xl font-bold text-violet-800 mb-3">
            Edit Student
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
                value={name}
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
                value={surname}
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
                placeholder="Enter GPA"
                value={gpa}
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
                value={sendFaculty}
                onChange={handleFacultyChange}
              >
                <option>Select a Faculty</option>
                {faculties.map((fac: any) => (
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
                value={classId}
                onChange={sendClassesChange}
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
    </>
  );
};
export default EditStudent;
