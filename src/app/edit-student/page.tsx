import React from "react";

const EditStudent = () => {







return (<>
  <div className=" flex-items-center justify-center min-h-screen">

    <div className="flex flex-col justify-center p-8 md:p-14">
      <h2 className="text-4xl font-bold text-violet-800 mb-3">Student Name</h2>
      <p className="font-light text-gray-500 mb-8">
        edit credentials
      </p>
      <form>
        <div className="flex flex-col">
          <label htmlFor="user" className="mb-1 text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"

          />
        </div>


        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
            Surname
          </label>
          <input
            type="text"
            name="user"
            id="student-id"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"


          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
            Id
          </label>
          <input
            type="text"
            name="user"
            id="student-id"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"


          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
            GPA
          </label>
          <input
            type="text"
            name="user"
            id="student-id"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
            Faculty
          </label>
          <input
            type="text"
            name="user"
            id="student-id"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
            Class
          </label>
          <input
            type="text"
            name="user"
            id="student-id"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
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

</>)
}

export default EditStudent;