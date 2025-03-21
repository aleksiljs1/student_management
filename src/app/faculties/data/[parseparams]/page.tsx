"use client"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { PieChart } from "@mui/x-charts";
import Header from "@/components/header";
import { ToastContainer } from "react-toastify";

const FacultyData = () => {
  const { parseparams } = useParams();
  const [data, setData] = useState([])
  const [faculty, setFaculty] = useState("");
  const [headOfFaculty, setHeadOfFaculty] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`api/data/get-edit-faculty/${parseparams}`)
      .then((response) => {
        const facultiesData = response.data;
        setFaculty(facultiesData.name);
        setHeadOfFaculty(facultiesData.head_of_faculty);
      })
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/api/data/faculty-gpa/${parseparams}`)
      .then((response) => {
        const formattedData = response.data.map((item, index) => ({
          id: index,
          value: item.count,
          label: item.category,
        }));
        setData(formattedData);
      })
  }, [parseparams]);

  return <>
    <ToastContainer />
    <Header />
    <h1 className="text-4xl font-bold text-center my-6 text-violet-600">{faculty}</h1>
    <div className="flex justify-center items-center p-5">
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            outerRadius: 160,
          },
        ]}
        width={600}
        height={400}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: { top: 10 },
          },
        }}
        margin={{ top: 40, bottom: 120, right: 20, left: 20 }}
      />
    </div>
  </>


}
export default FacultyData;