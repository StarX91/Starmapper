import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreateImageset from "./CreateImageset";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const CreatePlan = () => {
  const [showImageset, setShowImagesetComponent] = useState(false);
  const [planName, setPlanName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [subfolders, setSubfolders] = useState([]);
  const [selectedSubfolder, setSelectedSubfolder] = useState("");

  const uid = localStorage.getItem("uid");
  const projectName = localStorage.getItem("projectName");
  console.log(projectName);

  // Fetch subfolders when component mounts
  useEffect(() => {
    const fetchSubfolders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/starmarg/getSubfolders", {
          params: { uid, projectName },
        });
        if (response.status === 200) {
          setSubfolders(response.data);
        }
      } catch (error) {
        setError("Failed to fetch subfolders. Please try again.");
      }
    };
    fetchSubfolders();
  }, [uid, projectName]);

  const handleNextClick = async () => {
    if (planName.trim() === "") {
      setError("Please fill in the plan name.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/starmarg/createSubfolder", {
        uid,
        projectName,
        planName,
      });

      if (response.status === 201) {
        setShowImagesetComponent(true);
        localStorage.setItem("planName",planName);
        setMessage("Subfolder created successfully.");
      } else if (response.status === 409) {
        setMessage("Subfolder already exists.");
      } else {
        setError("Error creating subfolder. Please try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  const handlePlanNameChange = (e) => {
    setPlanName(e.target.value);
    if (error) setError("");
    if (message) setMessage(""); // Clear message when the user starts typing
  };

  const handleSubfolderSelect = (e) => {
    const selected = e.target.value;
    setSelectedSubfolder(selected);
    setShowImagesetComponent(true); // Show imageset for the selected subfolder
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-2 font-sans">
      {!showImageset && <Navbar />}
      {!showImageset ? (
        <>
          <div className="text-center py-8">
            <h1 className="text-4xl text-neutral-300 font-bold">Create Project</h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-center py-2 space-y-2 sm:space-y-0 sm:space-x-0 items-center">
            <button className="p-2 bg-neutral-900 text-neutral-300 text-md rounded-full h-10 min-w-[130px]">
              Create Project
            </button>
            <div className="w-16 h-0.5 bg-red-950"></div>
            <button className="p-2 bg-neutral-950 text-neutral-300 rounded-full h-10 border border-neutral-400 hover:bg-neutral-700 min-w-[130px]">
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
              <div className="w-full sm:w-1/5">
                <label htmlFor="planName" className="text-neutral-400 text-md font-semibold">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                  placeholder="Enter Plan Name"
                  value={planName}
                  onChange={handlePlanNameChange}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {message && <p className="text-green-500 mt-2">{message}</p>}
              </div>
              <div className="w-full sm:w-1/5 sm:mr-60">
                <label htmlFor="selectSubfolder" className="text-neutral-400 text-md font-semibold">
                  Select Plan
                </label>
                <select
                  id="selectSubfolder"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                  value={selectedSubfolder}
                  onChange={handleSubfolderSelect}
                >
                  <option value="" disabled>
                    Select Plan
                  </option>
                  {subfolders.map((subfolder) => (
                    <option key={subfolder._id} value={subfolder.folderName}>
                      {subfolder.folderName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="p-2 bg-neutral-500 text-neutral-900 font-semibold text-md mt-4 sm:mt-6 px-10 rounded"
                onClick={handleNextClick}
                disabled={planName.trim() === ""}
              >
                Next
              </button>
            </div>
            <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl">
              <div className="p-4">
                <div className="w-40 h-40 rounded-lg bg-neutral-500 mb-2"></div>
                <div className="">
                  <p className="text-md font-semibold text-neutral-300">Sample_Image</p>
                  <p className="text-sm text-neutral-500">10th July</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CreateImageset subfolderName={selectedSubfolder} />
      )}
    </div>
  );
};

export default CreatePlan;
