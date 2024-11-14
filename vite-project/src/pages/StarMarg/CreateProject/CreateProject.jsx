import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CreatePlan from "./CreatePlan";
import GoogleMap from "./Map";
import axios from "axios";

const CreateProject = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [existingProjects, setExistingProjects] = useState([]); // State to hold existing projects
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const isImagesRoute = location.pathname.includes("/images");

  useEffect(() => {
    const storedProjectName = localStorage.getItem("projectName");
    if (storedProjectName) {
      setProjectName(storedProjectName);
    }

    // Fetch existing projects from the database
    const fetchExistingProjects = async () => {
      const uid = localStorage.getItem("uid");
      try {
        const response = await axios.get(`http://localhost:5000/starmarg/getProjects/${uid}`);
        if (response.status === 200) {
          setExistingProjects(response.data.projects); // Assuming the response has a 'projects' array
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchExistingProjects();
  }, []);

  const handleNext = async () => {
    if (projectName.trim() === "") {
      setError("Please fill in the project name");
    } else {
      const uid = localStorage.getItem("uid");

      try {
        const response = await axios.post("http://localhost:5000/starmarg/createProject", {
          uid,
          projectName,
        });

        if (response.status === 201) {
          setIsNextClicked(true);
          localStorage.setItem("projectName", projectName);
          setMessage(response.data.message);
        } else if (response.status === 409) {
          setMessage("Folder already exists for this project name.");
        }
      } catch (error) {
        setError("Error creating folder. Please try again.");
      }
    }
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
    if (error) setError("");
  };

  const handleSelectProject = (e) => {
    const selectedProject = e.target.value;
    if (selectedProject) {
      localStorage.setItem("projectName", selectedProject); // Save selected project name
      navigate("/create-plan"); // Navigate to the CreatePlan page
    }
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-2 font-sans">
      {!isNextClicked && !isImagesRoute && <Navbar />}

      {isNextClicked ? (
        <CreatePlan />
      ) : (
        <>
          <div className="text-center py-8">
            <h1 className="text-4xl text-neutral-300 font-bold">Create Project</h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-center py-2 space-y-2 sm:space-y-0 sm:space-x-0 items-center">
            <button className="p-2 bg-neutral-950 border border-neutral-400 text-neutral-300 text-md rounded-full h-10 hover:bg-neutral-700 min-w-[130px]">
              Create Project
            </button>
            <div className="w-16 h-0.5 bg-red-800"></div>
            <button className="p-2 bg-neutral-900 text-neutral-300 rounded-full h-10 hover:bg-neutral-700 min-w-[130px]">
              Create Plan
            </button>
            <div className="w-16 h-0.5 bg-red-800"></div>
            <button className="p-2 bg-neutral-900 text-neutral-300 rounded-full h-10 text-[16px] hover:bg-neutral-700 min-w-[130px]">
              Create Imageset
            </button>
            <div className="w-16 h-0.5 bg-red-800"></div>
            <button className="p-2 bg-neutral-900 text-[15px] text-neutral-300 rounded-full h-10 hover:bg-neutral-700 min-w-[130px]">
              Upload Imageset
            </button>
          </div>
          <div className="bg-neutral-900 p-8 w-11/12 min-h-[450px] rounded-3xl mx-auto mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/4">
                <label
                  htmlFor="projectName"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {message && <p className="text-green-500 mt-2">{message}</p>}
              </div>
              <div className="w-full sm:w-1/4 sm:mr-60">
                <label
                  htmlFor="selectProject"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Select Project
                </label>
                <select
                  id="selectProject"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                  onChange={handleSelectProject} // Handle project selection
                >
                  <option value="" disabled selected>
                    Select Project
                  </option>
                  {existingProjects.map((project, index) => (
                    <option key={index} value={project.folderName}>
                      {project.folderName} {/* Assuming project has 'folderName' */}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="p-2 bg-neutral-500 text-neutral-900 font-semibold text-md mt-4 sm:mt-6 px-10 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl">
              <GoogleMap />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProject;
