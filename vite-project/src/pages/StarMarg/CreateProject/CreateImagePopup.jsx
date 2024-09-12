import React, { useState } from "react";

const CreateImagePopup = ({ closePopup, openImagesComponent }) => {
  const [imagesetName, setImagesetName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    openImagesComponent(imagesetName); // Trigger the openImagesComponent function and pass imagesetName
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg w-1/3 text-center text-neutral-300">
        <h2 className="text-lg font-semibold mb-4">Create an Imageset</h2>
        <p className="text-sm mb-4">
          To upload an image, you need to create an imageset.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 bg-neutral-800 text-neutral-300 rounded-md mb-4"
            placeholder="Enter name"
            value={imagesetName}
            onChange={(e) => setImagesetName(e.target.value)}
            required
          />
          <div className="flex justify-between ">
            <button
              type="button"
              onClick={closePopup}
              className="p-1 px-10 bg-neutral-900  border border-neutral-400 rounded-md text-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-1 px-10 bg-neutral-400 text-neutral-900 font-semibold rounded-md text-neutral-300"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateImagePopup;
