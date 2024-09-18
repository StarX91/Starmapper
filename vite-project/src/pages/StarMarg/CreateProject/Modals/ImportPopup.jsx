import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaGoogleDrive } from "react-icons/fa";
import { MdFolder } from "react-icons/md";

const ImportPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
      <div className="bg-neutral-900 p-6 rounded-lg max-w-3xl w-full h-3/5">
        {/* Header */}
        <div className="  mb-6">
          <h2 className="text-neutral-300 text-center text-2xl font-bold">
            Import
          </h2>
        </div>

        {/* Content */}
        <div className="flex justify-around mb-6">
          <button className="flex flex-col border border-neutral-400 p-6 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200">
            <FaGoogleDrive size={48} />
            <span>
              Google Drive{" "}
              <span>
                {""}
                {">"}
              </span>
            </span>
          </button>
          <button className="flex flex-col border border-neutral-400 p-6 rounded-md  items-center space-y-2 text-neutral-300 hover:text-neutral-200">
            <MdFolder size={48} />
            <span>
              Local Storage{" "}
              <span>
                {""}
                {">"}
              </span>
            </span>
          </button>
        </div>

        {/* Drag and Drop Area */}
        <div className="border-2 border-dashed border-neutral-500 rounded-lg p-12 h-52 text-center flex justify-center items-center text-neutral-400">
          <p>Drop the files here.</p>
        </div>

        {/* Cancel Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportPopup;
