import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const UploadImages = ({ closePopup }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFinish = () => {
    // Close the modal and navigate to the Images component
    navigate("/images");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Subtle blurred background */}
      <div className="absolute inset-0 bg-black bg-opacity-60 "></div>

      {/* Modal content */}
      <div className="relative bg-neutral-900 p-8 rounded-xl max-w-lg w-11/12 z-50">
        <h2 className="text-2xl text-center text-neutral-300 mb-8">
          Upload Images
        </h2>

        {/* Upload Form */}
        <div className="flex flex-col">
          <p className="text-center text-neutral-400 mb-4">
            Click finish to start uploading Images
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-2">
          <button
            className="bg-neutral-900 border text-neutral-400 p-1 rounded-md font-semibold px-6 mr-2"
            onClick={closePopup} // Close the popup on click
          >
            Cancel
          </button>
          <button
            className="bg-neutral-400 text-neutral-900  p-1 px-6 font-semibold rounded-md"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
