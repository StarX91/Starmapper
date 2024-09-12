import React, { useState } from "react";
import { useLocation } from "react-router-dom";
//import CreateImagePopup from "./CreateImagePopup";
//import Images from "./Images"; // Import Images component
import CreateImageset from "./CreateImageset";
import Navbar from "../Navbar/Navbar"; // Now importing Navbar directly

const CreatePlan = () => {
  // const [showPopup, setShowPopup] = useState(false); // Control the visibility of the popup
  const [showImageset, setShowImagesetComponent] = useState(false); // Control whether Images component is shown
  // const location = useLocation();

  // Check if the current route includes '/images'
  // const isImagesRoute = location.pathname.includes("/images");

  const handleNextClick = () => {
    setShowImagesetComponent(true); // Open the Imageset popup
  };

  {
    /*}  const closePopup = () => {
    setShowPopup(false); // Close the popup
  }; */
  }

  {
    /*}  const openImagesComponent = (imagesetName) => {
    // Close popup and show Images component
    setShowPopup(false);
    setShowImagesComponent(true); // Trigger the display of Images component
  }; */
  }

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-2 font-sans">
      {/* Only render Navbar if Images component is not shown */}
      {!showImageset && <Navbar />}
      {/* Render CreateImagePopup if showPopup is true 
      {showPopup && (
        <CreateImagePopup
          closePopup={closePopup}
          openImagesComponent={openImagesComponent} // Pass function to show Images component
        />
      )}

      {/* Conditional Rendering: Show CreatePlan if Images component is not shown */}
      {!showImageset ? (
        <>
          {/* Create Project Heading */}
          <div className="text-center py-8">
            <h1 className="text-4xl text-neutral-300 font-bold">
              Create Project
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-center py-2 space-y-2 sm:space-y-0 sm:space-x-0 items-center">
            <button className="p-2 bg-neutral-900  text-neutral-300 text-md rounded-full h-10  min-w-[130px]">
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

          {/* Create Plan */}
          <div className="bg-neutral-900 p-8 w-11/12 min-h-[450px] rounded-3xl mx-auto mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/5">
                <label
                  htmlFor="planName"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                  placeholder="Enter Plan Name"
                />
              </div>
              <div className="w-full sm:w-1/5  sm:mr-60">
                <label
                  htmlFor="selectProject"
                  className="text-neutral-400 text-md font-semibold"
                >
                  Select Plan
                </label>
                <select
                  id="selectProject"
                  className="mt-2 w-full p-2 rounded-md bg-neutral-800 text-neutral-400"
                >
                  <option value="" disabled selected>
                    Select Plan
                  </option>
                  {/* Add your project options here */}
                </select>
              </div>

              <button
                className="p-2 bg-neutral-500 text-neutral-900 font-semibold text-md mt-4 sm:mt-6 px-10 rounded"
                onClick={handleNextClick} // Trigger popup
              >
                Next
              </button>
            </div>
            <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl">
              <div className="p-4">
                <div className="w-40 h-40 rounded-lg bg-neutral-500 mb-2"></div>
                <div className="">
                  <p className="text-md font-semibold text-neutral-300">
                    {" "}
                    Sample_Image
                  </p>
                  <p className="text-sm text-neutral-500">10th July</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CreateImageset /> // Render Images component if showImagesComponent is true
      )}
    </div>
  );
};

export default CreatePlan;
