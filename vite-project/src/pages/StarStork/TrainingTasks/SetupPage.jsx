import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../StarStork/Dashboard/Navbar";
import { PiCursorThin } from "react-icons/pi";
import { MdMyLocation } from "react-icons/md";
import { CiImport } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { LiaVectorSquareSolid } from "react-icons/lia";

const Setup = () => {
  const [activeStep, setActiveStep] = useState("Create Task");

  const openTaskModal = (index) => {
    setSelectedProject(projects[index]);
    setIsTaskNameModalOpen(true);
    setActiveStep("Create Task");
    setShowImagesComponent(false);
  };

  const handleCreateTask = () => {
    if (taskName.trim() !== "") {
      console.log(
        `Task "${taskName}" created for project: ${selectedProject.name}`
      );
      setIsTaskNameModalOpen(false);
      setTaskName("");
      setShowImagesComponent(true);
      setActiveStep("Images");
      setIsTaskAssigned(true);
    } else {
      alert("Task name cannot be empty");
    }
  };

  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/report");
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300">
      <Navbar />
      <div className="flex justify-center items-center p-4">
        <h1 className="text-neutral-300 text-3xl font-semibold mt-1">
          Training Task
        </h1>
      </div>

      <div className="flex justify-center pt-2 ">
        <button
          className={`py-2 px-6 rounded-full ${
            activeStep === "Create Task"
              ? "bg-neutral-900 text-neutral-400 hover:border-neutral-400"
              : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-400"
          }`}
          onClick={() => setActiveStep("Create Task")}
        >
          Create Task
        </button>
        <div className="w-16 h-0.5 mt-5  bg-red-800"></div>

        <button
          className={`py-2 px-10 rounded-full ${
            activeStep === "Images"
              ? "bg-black text-neutral-400 hover:border-neutral-400"
              : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-400"
          }`}
          onClick={() => {
            if (!isTaskAssigned) {
              alert("Create a task first");
            } else {
              setActiveStep("Images");
              setShowImagesComponent(true);
            }
          }}
        >
          Images
        </button>
        <div className="w-16 h-0.5 mt-5  bg-red-800"></div>

        <button
          className={`py-2 px-10 rounded-full ${
            activeStep === "setup"
              ? "bg-black text-neutral-400 hover:border-neutral-400"
              : "bg-black text-neutral-500 hover:bg-neutral-800 hover:text-neutral-400 border"
          }`}
          onClick={() => {
            if (showImagesComponent) {
              navigate("/setup");
            } else {
              alert("Complete image section first");
            }
          }}
        >
          Setup
        </button>
        <div className="w-16 h-0.5 mt-5  bg-red-800"></div>

        <button
          className="bg-neutral-900 text-neutral-500 py-2 px-10 rounded-full focus:outline-none hover:bg-neutral-800 hover:text-neutral-400"
          onClick={() => alert("Complete the setup first")}
        >
          Report
        </button>
      </div>

      <div className="flex flex-col bg-black md:h-full md:flex-row justify-center items-start  p-8">
        <div className="w-full bg-neutral-900 p-4 min-h-[575px] rounded-3xl shadow-lg flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <span className="text-neutral-400 font-semibold text-lg px-1">
              DJii0880.jpg
            </span>
            <div className="flex flex-wrap border border-red-600 rounded-sm text-md ">
              <span className="text-zinc-400 font-semibold bg-neutral-900 px-4 py-1 rounded-sm  ">
                Annotated: 0
              </span>
              <div className="h-8 w-px bg-red-800"></div>
              <span className="text-neutral-900 font-bold bg-neutral-400 px-2 py-1 rounded-sm">
                Non-annotated: 0
              </span>
            </div>
            <div className="flex flex-wrap gap-8 mt-2  md:mt-0 mr-4">
              <button className="bg-black font-semibold text-zinc-300 px-8 py-1 rounded-md border-2 border-zinc-400">
                Clear
              </button>
              <button
                onClick={handleDone}
                className="bg-neutral-400 text-neutral-900 font-semibold border-2 border-zinc- px-8 py-1 rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
          <div className="bg-neutral-500 h-px w-full -mx-4"></div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar */}
            <div className="w-full md:w-12 bg-zinc-900 flex flex-wrap md:flex-col items-center py-4">
              <PiCursorThin
                className="text-zinc-300 my-2 cursor-pointer"
                size={24}
              />
              <LiaVectorSquareSolid
                className="text-zinc-200 my-2 cursor-pointer"
                size={24}
              />
              <MdMyLocation
                className="text-zinc-100 my-2 cursor-pointer"
                size={24}
              />
              <CiImport
                className="text-zinc-300 my-2 cursor-pointer"
                size={24}
              />
              <GoUpload
                className="text-zinc-300 my-2 cursor-pointer"
                size={24}
              />
            </div>

            <div className="flex flex-col md:flex-row flex-1 gap-4">
              <div className="bg-neutral-950 md:h-[500px] rounded-sm flex-1">
                {/* Placeholder for the image */}
                <div className="bg-stone-500 md:h-[420px] my-8 mx-8 rounded-sm mb-4 flex-1">
                  {/* Placeholder for the image */}
                </div>
                <button className=" rounded-t-3xl rounded-b-none flex items-center justify-center h-8 w-1/6 p bg-neutral-800 rounded-md "></button>
              </div>
              <div className="w-full md:w-1/4 lg:w-1/6 bg-zinc-900 p-4 rounded-lg shadow-lg">
                <button className="bg-neutral-800 text-zinc-400 w-full py-2 mb-4 rounded-lg font-semibold">
                  Add new class objects
                </button>
                <div className="flex justify-center">
                  <button className="bg-neutral-400 text-neutral-900 font-semibold w-1/3 py-1 mb-4 rounded-lg">
                    Add
                  </button>
                </div>
                <div className="text-zinc-300 text-lg mb-2">Classes</div>
                <div className="space-y-2">
                  <div className="flex">
                    <div className="text-green-400 bg-green-800 px-1 rounded-md">
                      Trees{" "}
                    </div>
                    <div className="ml-2"> -0</div>
                  </div>
                  <div className="flex">
                    <div className="text-blue-400 bg-blue-800 px-1 rounded-md">
                      Rooftops{" "}
                    </div>
                    <div className="ml-2"> -0</div>
                  </div>
                  <div className="flex">
                    <div className="text-red-400 bg-red-800 px-1 rounded-md">
                      Roads{" "}
                    </div>
                    <div className="ml-2"> -0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
