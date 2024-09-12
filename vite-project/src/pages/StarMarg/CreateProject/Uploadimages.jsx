import React from "react";

const UploadImages = ({ closePopup }) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 p-8 rounded-xl max-w-lg w-11/12">
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
          <button className="bg-neutral-400 text-neutral-900  p-1 px-6 font-semibold rounded-md">
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
