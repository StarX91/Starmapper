import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleTrainingClick = () => {
    navigate("/training-task");
  };

  const handleAnnotationClick = () => {
    navigate("/annotation-task");
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Objects detected",
        data: [0, 1, 0, 1, 2, 1, 0],
        fill: false,
        borderColor: "#fff",
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Task Analysis",
        data: [1, 1],
        backgroundColor: ["#A8B12E", "#991B1B"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center relative">
        <select className="bg-neutral-800 text-neutral-300 py-2 ml-8 px-6 rounded-lg focus:outline-none">
          <option>Projects</option>
          <option>Project 1</option>
          <option>Project 2</option>
        </select>
        <div className="relative">
          <button
            className="bg-black text-neutral-300 py-2 px-6 mr-10 border border-neutral-400 rounded-lg hover:bg-neutral-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            + New Task
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 mr-8 bg-black  rounded-lg shadow-lg py-2 z-20">
              {/* Additional Dropdown Options */}
              <div
                className="px-4 py-2 m-3 flex items-center border border-neutral-400 rounded-md hover:bg-neutral-800 cursor-pointer"
                onClick={handleAnnotationClick}
              >
                <div className="text-white text-lg mr-4 px-2">
                  {/* Icon Placeholder */}
                  <svg
                    className="w-6 h-6 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 20l9-5-9-5-9 5 9 5zm0-5V4l9 5-9 5-9-5 9-5-9-5-9 5 9 5-9-5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-300 font-semibold">
                    Annotation Report
                  </p>
                  <p className="text-neutral-500 text-sm">
                    Perform manual annotations and create a report
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 m-3 flex items-center border border-neutral-400 rounded-md hover:bg-neutral-800 cursor-pointer">
                <div
                  className="text-white text-lg mr-4 px-2"
                  onClick={handleAnnotationClick}
                >
                  {/* Icon Placeholder */}
                  <svg
                    className="w-6 h-6 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 20l9-5-9-5-9 5 9 5zm0-5V4l9 5-9 5-9-5 9-5-9-5-9 5 9 5-9-5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-300 font-semibold">Detection</p>
                  <p className="text-neutral-500 text-sm">
                    Analyze image using<br></br> detector
                  </p>
                </div>
              </div>
              <div
                className="px-4 py-2 m-3 flex items-center border border-neutral-400 rounded-md hover:bg-neutral-800 cursor-pointer"
                onClick={handleTrainingClick}
              >
                <div className="text-white text-lg mr-4 px-2">
                  {/* Icon Placeholder */}
                  <svg
                    className="w-6 h-6 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 20l9-5-9-5-9 5 9 5zm0-5V4l9 5-9 5-9-5 9-5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-300 font-semibold">Training</p>
                  <p className="text-neutral-500 text-sm">
                    Train and create a <br /> detector
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sample Windmill Section */}
      <div className="bg-neutral-900 p-4 rounded-lg relative">
        <div className="items-center ">
          <div className="bg-neutral-700 w-60 h-60 rounded-lg"></div>
          <div className="flex justify-between w-1/5">
            <div className="mt-2">
              <p className="text-neutral-300 text-l">Sample Windmill</p>
              <p className="text-neutral-500">10 June 2024</p>
            </div>
            <button className="flex mr-12 mt-2 text-neutral-400">...</button>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          className="bg-neutral-900 p-4 rounded-lg relative"
          style={{ height: "350px" }}
        >
          <p className="text-neutral-300 text-lg mb-2">Objects detected</p>
          <div style={{ height: "250px" }}>
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
          <button className="absolute top-4 right-4 text-neutral-400 text-sm">
            View All
          </button>
        </div>
        <div
          className="bg-neutral-900 p-4 rounded-lg relative"
          style={{ height: "350px" }}
        >
          <p className="text-neutral-300 text-lg mb-4">Task Analysis</p>
          <div style={{ height: "250px" }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="flex justify-around mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#A8B12E] rounded-full mr-2"></div>
              <p className="text-neutral-300 text-sm">Completed</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#991B1B] rounded-full mr-2"></div>
              <p className="text-neutral-300 text-sm">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
