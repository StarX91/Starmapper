import React, { useState } from "react";

const ImagesetModal = ({ isOpen, onClose, navigate }) => {
  const [imagesetName, setImagesetName] = useState("");

  const handleInputChange = (e) => {
    setImagesetName(e.target.value);
  };

  const handleAnnotate = () => {
    if (imagesetName.trim()) {
      console.log("Annotate clicked with imageset name:", imagesetName);
      onClose(); // Close the modal
      navigate("/setup"); // Navigate to the Setup page
    } else {
      alert("Imageset name cannot be empty");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-neutral-900 rounded-xl shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-lg font-semibold text-center text-neutral-300 mb-2">
          Create an Imageset
        </h2>
        <p className="text-center text-neutral-500 mb-4">
          To upload images, you need to create an Imageset first.
        </p>
        <input
          type="text"
          value={imagesetName}
          onChange={handleInputChange}
          placeholder="Enter Imageset Name"
          className="w-full p-2 border border-neutral-700 rounded-md focus:outline-none text-neutral-400 bg-neutral-800 mb-4"
        />
        <div className="flex justify-between space-x-4 p-1">
          <button
            onClick={onClose}
            className="bg-neutral-900 border border-neutral-400  text-neutral-200  px-4 py-1 rounded-md w-1/4"
          >
            Cancel
          </button>
          <button
            onClick={handleAnnotate}
            className="bg-neutral-300 text-neutral-900 font-semibold  px-4 py-1 rounded-md w-1/4"
          >
            Annotate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagesetModal;
