"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { urlConst } from "@/consts/path-consts";
import { useRouter } from "next/navigation";
const AddStudent = () => {

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [gpa, setGpa] = React.useState("");
  const [faculty, setFaculty] = React.useState([]);
  const [sendFaculty, setSendFaculty] = React.useState("");
  const [sendClasses, setSendClasses] = React.useState("");
  const [classes, setClasses] = React.useState([]);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
  const handleGPAChange = (event) => {
    setGpa(event.target.value);
  }
  const handleFacultyChange = (event) => {
    setSendFaculty(event.target.value);
  }
  const sendClassesChange = (event) => {
    setSendClasses(event.target.value);
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data/Faculty", {
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

    axios.get("http://localhost:3000/api/data/student-class",{
      headers:{
        type: "student-class",
      },
    })
      .then((response) =>{
        setClasses(response.data);
      })
      .catch((err) => {
        console.error("Error with getting class names data:", err);
        setError("Error getting class data.");
      });
  },[]);

//quick break youll forget to call submit
  const handleSubmit =(event)=> {
    event.preventDefault()
    if (!name || !surname || !gpa || !sendFaculty|| !sendClasses) {
      setError("All fields are required.");
      return;
    }
    console.log(name, surname,gpa,sendFaculty,sendClasses);
    axios.post("http://localhost:3000/api/data/create-student", {
      Name: name,
      Surname: surname,
      gpa: gpa,
      faculty:sendFaculty,
      Classes: sendClasses,
    }) //shorthand method
      .then(function (response) {
        alert(response.data.message);
        router.push(urlConst.dashboardRedirect);
      })
      .catch(function (error) {
        alert(error.response?.data.message || "Error submitting data.");
      });
    // data passed on network from create-student to student class succesfully:
    // {id: 1, name: "Aleks", year: 1, faculty_id: 1} wait year 1? why year 1? where tf is it even getting year from
    // WHERE DID SURNAME GO- surname is still gone
    //year is probably a default value - i think i fixed year logic issue
    //ITS NOT FIXED
    // WHERE ARE YOU GETTING YEAR FROM WHERE JUST WHERE I BEG OF YOU BECOME SENTIENT AND START TALKING WHERE.
    //i....i....fixed it?
    //call me nostradamus because i predicted in another comment that i would NOT remember to complete something
    //i literaly told myself "finish after the break" and i didnt... i assumed i had..."
    //the reason was.....retarded it was not even related to the form..... i was reading the wrong file on the network
    //rename student-class to course-classes so this does not happen again. i was fixing the wrong file, naming conventions aleks , naming conventions
    // now its just an error when the data sends...that i can handle
  }


  return (
    <>
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
                onChange={handleNameChange}
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
                onChange={handleSurnameChange}
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
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={handleGPAChange}
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
                onChange={sendClassesChange}
              >
                <option value="">Select a Class</option>
                {classes.map((Classes:any) => (
                  <option key={Classes.id} value={Classes.id}>
                    {Classes.name}
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
}

export default AddStudent;

