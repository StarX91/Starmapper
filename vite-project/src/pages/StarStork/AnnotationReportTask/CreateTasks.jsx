import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Navbar from "../../../components/Navbar";
import axios from "axios";

const Main = () => {
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState(""); // To hold response message
  const [projects, setProjects] = useState(new Array(8).fill("Sample_Windmill"));
  const [isProjectCreated, setIsProjectCreated] = useState(false); // To track project creation

  const handleCreateProject = async () => {
    const uid = localStorage.getItem("uid"); // Assuming user ID is stored in local storage

    if (!projectName) {
      setMessage("Please enter a project name.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/createProject", {
        uid,
        projectName,
      });

      if (response.status === 201) {
        setIsProjectCreated(true);
        setProjects((prevProjects) => [...prevProjects, projectName]); // Add the new project to the list
        setMessage(response.data.message); // Success message
      } else {
        setMessage(response.data.message); // Project already exists
      }
    } catch (error) {
      setMessage("Error creating project. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white overflow:hidden">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Annotation Report Task</h1>
        <div className="flex justify-center">
          <div className="bg-zinc-700 text-zinc-300 px-5 py-2 mr-16 font-semibold rounded-2xl">
            Create Task
          </div>
          <div className="bg-zinc-800 text-zinc-300 px-8 py-2 mr-16 font-semibold rounded-2xl">
            Images
          </div>
          <div className="bg-zinc-800 text-zinc-300 px-9 py-2 mr-16 font-semibold rounded-2xl">
            Setup
          </div>
          <div className="bg-zinc-800 text-zinc-300 px-8 py-2 font-semibold rounded-2xl">
            Report
          </div>
        </div>
        <div className="bg-zinc-900 px-16 py-4 mt-2 rounded-2xl">
          <div className="flex justify-between relative mb-4">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Search Tasks"
                className="w-3/4 font-semibold px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200"
              />
              <button className="w-1/6 h-5/6 mt-1 mr-3 border-2 border-zinc-400 rounded-xl bg-zinc-700 text-white">
                <BiSearchAlt className="size-[40px] pl-2" />
              </button>
            </div>
            <h2 className="text-center text-zinc-500 text-xl mt-2 mr-24 font-bold mb-2">
              Select Project
            </h2>
            <div className="mt-2">
              <button
                className="bg-zinc-800 px-4 py-2 rounded-xl border-2 border-zinc-400"
                onClick={handleCreateProject}
              >
                + New Project
              </button>
            </div>
          </div>

          {/* Display message if no project exists */}
          {!isProjectCreated && (
            <div className="text-center text-red-500 mb-4">
              {message || "No project created yet."}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {projects.map((project, index) => (
              <div key={index} className="p-4 rounded-md">
                <div className="bg-zinc-600 h-48 rounded mb-2"></div>
                <p>{project}</p>
                <p className="text-sm text-gray-400">10 June 2024</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
