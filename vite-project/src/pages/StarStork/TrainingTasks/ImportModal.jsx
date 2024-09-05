import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaGoogleDrive, FaFolderOpen } from "react-icons/fa"; // Import Google Drive and Folder icons

const ImportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-neutral-900 p-8 rounded-lg w-[40rem]">
        {" "}
        {/* Updated width for better layout */}
        <h2 className="text-neutral-300 text-center text-2xl font-medium mb-6">
          Import
        </h2>
        <div className="flex justify-around mb-6">
          {" "}
          {/* Adjusted margin */}
          {/* Google Drive Button */}
          <button className="relative w-36 h-24 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-lg flex flex-col justify-center items-center hover:border-neutral-400">
            <FaGoogleDrive className="text-3xl mb-2" />{" "}
            {/* Google Drive Icon */}
            Google Drive
            <MdKeyboardArrowRight className="absolute bottom-2 right-2 text-neutral-400" />
          </button>
          {/* Local Storage Button */}
          <button className="relative w-36 h-24 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-lg flex flex-col justify-center items-center hover:border-neutral-400">
            <FaFolderOpen className="text-3xl mb-2" />{" "}
            {/* Local Storage Icon */}
            Local Storage
            <MdKeyboardArrowRight className="absolute bottom-2 right-2 text-neutral-400" />
          </button>
        </div>
        {/* Dotted File Drop Area */}
        <div className="border-dashed border-2 border-neutral-500 h-32 mb-6 rounded-lg flex items-center justify-center">
          <span className="text-neutral-400">Drop the files here.</span>
        </div>
        {/* Cancel Button */}
        <button
          className="bg-neutral-900 text-neutral-300 py-2 px-6 rounded-md focus:outline-none hover:border-neutral-500 border mx-auto block"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImportModal;
