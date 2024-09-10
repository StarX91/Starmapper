import React from "react";

const AssetsModal = ({ show, onClose }) => {
  if (!show) return null; // If modal is not shown, return nothing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-neutral-950 p-8 rounded-xl w-1/2 h-fit border border-neutral-400">
        <h2 className="text-neutral-300 mb-6 text-lg">Assets</h2>

        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* First row of buttons */}
          <div className="flex flex-col justify-end items-center bg-neutral-950 p-4 h-52 w-3/5 mx-auto border rounded-3xl">
            <span className="text-neutral-400 font-semibold mb-2">Ortho</span>
            <button className="bg-neutral-400 text-neutral-900 font-semibold py-2 px-14 rounded-lg">
              Upload
            </button>
          </div>
          <div className="flex flex-col justify-end items-center bg-neutral-950 p-4 h-52 w-3/5 mx-auto border rounded-3xl">
            <span className="text-neutral-400 mb-2 font-semibold ">DSM</span>
            <button className="bg-neutral-400 text-neutral-900 font-semibold py-2 px-14 rounded-lg">
              Upload
            </button>
          </div>

          {/* Second row of buttons */}
          <div className="flex flex-col justify-end items-center bg-neutral-950 p-4 h-52 w-3/5 mx-auto border rounded-3xl">
            <span className="text-neutral-400 mb-2 font-semibold ">DTM</span>
            <button className="bg-neutral-400 text-neutral-900 font-semibold py-2 px-14 rounded-lg">
              Upload
            </button>
          </div>
          <div className="flex flex-col justify-end items-center bg-neutral-950 p-4 h-52 w-3/5 mx-auto border rounded-3xl">
            <span className="text-neutral-400 mb-2 font-semibold ">
              LAS/LAZ
            </span>
            <button className="bg-neutral-400 text-neutral-900 font-semibold py-2 px-14 rounded-lg">
              Upload
            </button>
          </div>
        </div>

        <div className="flex pt-4 justify-center">
          <button
            onClick={onClose}
            className="w-1/5 bg-neutral-400 text-neutral-900 py-3 font-semibold text-xl rounded-md hover:bg-neutral-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetsModal;
