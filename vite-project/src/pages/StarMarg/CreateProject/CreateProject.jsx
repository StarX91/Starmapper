/*import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import CreatePlan from "./CreatePlan";

const CreateProject = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);

  const handleNext = () => {
    setIsNextClicked(true);
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-2 font-sans">
      <Navbar />
      {isNextClicked ? (
        <CreatePlan />
      ) : (
        <>
          {/* Create Project Heading 
          <div className="text-center py-8">
            <h1 className="text-4xl text-neutral-300 font-bold">
              Create Project
            </h1>
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

          {/* Create Project 
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
                />
              </div>
              <div className="w-full sm:w-1/4  sm:mr-60">
                <label
                  htmlFor="selectProject"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Select Project
                </label>
                <select
                  id="selectProject"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                >
                  <option value="" disabled selected>
                    Select Project
                  </option>
                  {/* Add your project options here 
                </select>
              </div>

              <button
                className="p-2 bg-neutral-500 text-neutral-900 font-semibold text-md mt-4 sm:mt-6 px-10 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProject;
*/

/*import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Import your existing navbar
import CreatePlan from "./CreatePlan";
import Images from "./Images"; // Assuming this is your Images component

const CreateProject = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const location = useLocation();

  // Check if the current route includes '/images'
  const isImagesRoute = location.pathname.includes("/images");

  const handleNext = () => {
    setIsNextClicked(true);
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-2 font-sans">
      {/* Conditionally render the Navbar *
      {!isImagesRoute && <Navbar />}
      {isNextClicked ? (
        <CreatePlan />
      ) : (
        <>
          {/* Create Project Heading *
          <div className="text-center py-8">
            <h1 className="text-4xl text-neutral-300 font-bold">
              Create Project
            </h1>
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

          {/* Create Project *
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
                />
              </div>
              <div className="w-full sm:w-1/4  sm:mr-60">
                <label
                  htmlFor="selectProject"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Select Project
                </label>
                <select
                  id="selectProject"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                >
                  <option value="" disabled selected>
                    Select Project
                  </option>
                  {/* Add your project options here *
                </select>
              </div>

              <button
                className="p-2 bg-neutral-500 text-neutral-900 font-semibold text-md mt-4 sm:mt-6 px-10 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProject;
*/
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Import your existing navbar
import CreatePlan from "./CreatePlan";
import Images from "./Images"; // Assuming this is your Images component
import GoogleMap from "./Map";

const CreateProject = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const location = useLocation();

  // Check if the current route includes '/images'
  const isImagesRoute = location.pathname.includes("/images");

  const handleNext = () => {
    setIsNextClicked(true);
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-2 font-sans">
      {/* Conditionally render the Navbar if isNextClicked is false */}
      {!isNextClicked && !isImagesRoute && <Navbar />}

      {isNextClicked ? (
        <CreatePlan />
      ) : (
        <>
          {/* Create Project Heading */}
          <div className="text-center py-8">
            <h1 className="text-4xl text-neutral-300 font-bold">
              Create Project
            </h1>
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

          {/* Create Project */}
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
                />
              </div>
              <div className="w-full sm:w-1/4  sm:mr-60">
                <label
                  htmlFor="selectProject"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Select Project
                </label>
                <select
                  id="selectProject"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                >
                  <option value="" disabled selected>
                    Select Project
                  </option>
                  {/* Add your project options here */}
                </select>
              </div>

              <button
                className="p-2 bg-neutral-500 text-neutral-900 font-semibold text-md mt-4 sm:mt-6 px-10 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl"><GoogleMap/></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProject;
