import React, { useState } from "react";
import Navbar from "../../StarStork/Dashboard/Navbar";
import { FiShare2 } from "react-icons/fi";
import { BsFileEarmarkText } from "react-icons/bs";
import { TbCube } from "react-icons/tb";
import { BiExport } from "react-icons/bi";

const Report = () => {
  const [isDetailedReport, setIsDetailedReport] = useState(false);

  const handleToggleReport = () => {
    setIsDetailedReport(!isDetailedReport);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300">
      <Navbar />
      <div className="flex justify-center items-center p-8">
        <h1 className="text-neutral-300 text-2xl md:text-3xl font-semibold">
          Training Task
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-0">
        <button className="py-2 px-6 rounded-full bg-neutral-900 text-neutral-500">
          Create Task
        </button>

        <div className="hidden md:block w-16 h-0.5 mt-5 bg-red-800"></div>

        <button className="py-2 px-10 rounded-full bg-neutral-900 text-neutral-500">
          Images
        </button>

        <div className="hidden md:block w-16 h-0.5 mt-5 bg-red-800"></div>

        <button className="py-2 px-10 rounded-full bg-neutral-900 text-neutral-500">
          Setup
        </button>

        <div className="hidden md:block w-16 h-0.5 mt-5 bg-red-800"></div>

        <button className="py-2 px-10 rounded-full bg-black border text-neutral-400">
          Report
        </button>
      </div>

      {isDetailedReport ? (
        <DetailedReport onToggleReport={handleToggleReport} />
      ) : (
        <SummaryReport onToggleReport={handleToggleReport} />
      )}
    </div>
  );
};

const SummaryReport = ({ onToggleReport }) => (
  <div className="flex flex-col justify-center items-center mt-2 p-4 min-h-screen md:min-h-[500px]">
    <div className="w-full md:w-10/12 lg:w-11/12 m-2 min-h-[400px] md:min-h-[600px] bg-neutral-900 p-4 md:p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-neutral-400">
          Summary Report
        </h2>
        <div className="flex space-x-2 md:space-x-4">
          <button className="bg-neutral-900 border border-neutral-400 text-zinc-400 px-4 py-2 rounded-lg flex items-center">
            <FiShare2 className="mr-2" /> Share
          </button>
          <button
            className="bg-neutral-400 text-neutral-900 font-semibold px-4 py-2 rounded-lg flex items-center"
            onClick={onToggleReport}
          >
            <BsFileEarmarkText className="mr-2 text-neutral-900" /> Detailed
            Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Task details and other report data here */}
        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Task Name</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">
            task_name
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Date Created</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">
            9 December 2024
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Class Labels</p>
          <p className="pt-3 flex flex-wrap gap-2">
            <span className="bg-green-900 text-sm px-2 text-green-400 rounded-sm">
              Trees
            </span>{" "}
            <span className="px-2 bg-red-900 text-red-400 text-sm rounded-sm">
              Roads
            </span>{" "}
            <span className="px-2 bg-blue-900 text-blue-500 text-sm rounded-sm">
              Rooftops
            </span>
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">No. of Images</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">14</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Detection Type</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">
            Defect
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Completed at</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">
            9 December 2024
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Imageset</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">
            form1
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-400 p-3 rounded-lg">
          <p className="text-neutral-400 font-semibold">Status</p>
          <p className="font-semibold text-lg text-neutral-300 truncate">
            Completed
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DetailedReport = ({ onToggleReport }) => (
  <div className="bg-neutral-900 p-2 md:p-10 w-full md:w-10/12 mx-auto mt-10 rounded-3xl">
    <div className="flex flex-col md:flex-row justify-between items-center mb-2 space-y-4 md:space-y-0">
      <h2 className="text-lg font-semibold text-neutral-400">
        Detailed Report
      </h2>
      <div className="flex space-x-2 md:space-x-4">
        <button className="bg-neutral-900 border border-neutral-400 text-zinc-400 px-4 py-2 rounded-lg flex items-center">
          <BiExport className="mr-2 " />
          Export
        </button>
        <button
          className="bg-neutral-400 text-neutral-900 font-semibold px-4 py-2 rounded-lg flex items-center"
          onClick={onToggleReport}
        >
          <BsFileEarmarkText className="mr-2 text-neutral-900" />
          Summary Report
        </button>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 md:space-x-4">
      <button className="bg-green-900 text-green-400 px-2 rounded-sm">
        Trees
      </button>
      <button className="bg-red-900 text-red-400 px-2 rounded-sm">Roads</button>
      <button className="bg-blue-900 text-blue-500 px-2 rounded-sm">
        Rooftops
      </button>
      <button className="bg-neutral-700 text-neutral-300 px-2 rounded-sm">
        Select All
      </button>
    </div>

    <div className="flex flex-col md:flex-row mt-4 gap-8">
      <div className="w-full md:w-1/5 p-4 rounded-lg">
        <div className="flex items-center justify-center mb-4 md:mb-0">
          <input type="checkbox" className="mr-2" />
          <p className="text-neutral-400">Show all images</p>
        </div>
        <div className="mt-4 md:mt-8">
          <div className="p-4 bg-neutral-800 rounded-md mb-4 border border-neutral-400">
            <p className="text-neutral-400 font-semibold">Image Analyzed</p>
            <p className="font-semibold text-lg text-neutral-300">14</p>
          </div>
          <div className="p-4 bg-neutral-800 rounded-md mb-4 border border-neutral-400">
            <p className="text-neutral-400 font-semibold">Objects Detected</p>
            <p className="font-semibold text-lg text-neutral-300">12</p>
          </div>
          <div className="p-4 bg-neutral-800 rounded-md mb-4 border border-neutral-400">
            <p className="text-neutral-400 font-semibold">Total Images</p>
            <p className="font-semibold text-lg text-neutral-300">14</p>
          </div>
          <div className="p-4 bg-neutral-800 h-20 rounded-md border border-neutral-400">
            <p className="text-neutral-400 font-semibold">Severity</p>
            <select className="w-full bg-neutral-900 text-neutral-300 rounded">
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="rounded-lg p-4">
            <div className="w-full h-24 sm:h-32 bg-neutral-600 mb-2 rounded"></div>
            <div className="flex justify-between items-center text-neutral-400 bg-neutral-900">
              <p>DJI0880.jpg</p>
              <div className="flex items-center mx-1">
                <TbCube className="w-4 h-4 text-neutral-400" />
                <span className="mr-1 ml-1">3</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Report;
