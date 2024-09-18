import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Uploadimages from "./Modals/Uploadimages";

function CreateImageset() {
  const [popup, setPopup] = useState(false);

  //next button on click
  const handleClick = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };
  return (
    <div>
      <Navbar />

      {/*Heading */}
      <div className="text-4xl text-center text-neutral-300 mb-8 mt-6">
        Create Project
      </div>

      {/*Buttons*/}
      <div className="flex justify-center mb-8 ">
        <div className="bg-neutral-800 rounded-3xl text-neutral-400 p-2 px-6">
          Create Project
        </div>
        <div className="h-0.5 w-16 bg-red-800 mt-4"></div>
        <div className="bg-neutral-800 rounded-3xl text-neutral-400 p-2 px-8">
          Create Plan
        </div>
        <div className="h-0.5 w-16 bg-red-800 mt-4"></div>
        <div className="bg-neutral-900 border border-neutral-400 rounded-3xl text-neutral-400 p-2 px-6">
          Create Imageset
        </div>
        <div className="h-0.5 w-16 bg-red-800 mt-4"></div>
        <div className="bg-neutral-800 rounded-3xl text-neutral-400 p-2 px-6">
          Upload Images
        </div>
      </div>

      {/* Container */}

      <div className="w-full flex justify-center items-center">
        <div className="h-[550px] pl-4 w-11/12 bg-neutral-900 rounded-3xl">
          <div className="flex justify-between p-8">
            <div className="">
              <h1 className="text-md text-neutral-400 mb-2">Imageset Name</h1>
              <input
                type="text"
                placeholder="Enter Imageset Name"
                className="w-full p-1 px-6 rounded-md bg-neutral-800 "
              />
            </div>
            <div className="">
              <h1 className="text-md text-neutral-400 mb-2">Select Imageset</h1>
              <select className="w-full p-1 px-10 rounded-md bg-neutral-800">
                <option>Select Imageset</option>
              </select>
            </div>
            <div>
              <button
                className="bg-neutral-400 text-neutral-900 font-semibold p-1 px-8 rounded-lg mt-4"
                onClick={handleClick}
              >
                Next
              </button>
            </div>
          </div>
          <div className="p-4 pl-8">
            <div className="bg-neutral-500 w-40 h-40 rounded-lg mb-1"></div>
            <p className="text-md text-neutral-400 font-semibold">
              Sample_Image
            </p>
            <p className="text-sm text-neutral-500">10th July</p>
          </div>
        </div>
      </div>
      {popup && <Uploadimages closePopup={closePopup} />}
    </div>
  );
}

export default CreateImageset;
