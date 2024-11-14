import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Uploadimages from "./Modals/Uploadimages";
import axios from "axios";

function CreateImageset() {
  const [popup, setPopup] = useState(false);
  const [imagesetName, setImagesetName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [existingImagesets, setExistingImagesets] = useState([]);
  const [selectedImageset, setSelectedImageset] = useState("");

  const uid = localStorage.getItem("uid");
  const projectName = localStorage.getItem("projectName");
  const subfolderName= localStorage.getItem("planName");

  useEffect(() => {
    // Fetch existing imagesets in the subfolder
    const fetchImagesets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/starmarg/getImagesets", {
          params: { uid, projectName, subfolderName },
        });
        setExistingImagesets(response.data); // Adjusted based on backend response
      } catch (error) {
        setError("Error fetching imagesets. Please try again.");
      }
    };

    fetchImagesets();
  }, [uid, projectName, subfolderName]);

  const handleClick = async () => {
    if (imagesetName.trim() === "") {
      setError("Please enter an imageset name.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/starmarg/createImageset", {
        uid,
        projectName,
        subfolderName,
        imagesetName, // Update to match the backend naming
      });

      if (response.status === 201) {
        setMessage("Imageset created successfully.");
        localStorage.setItem("imagesetName",imagesetName);
        setImagesetName(""); // Clear input on success
        setPopup(true); // Open modal for uploading images
      } else if (response.status === 409) {
        setError("Imageset name already exists.");
      } else {
        setError("Error creating imageset. Please try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  const handleImagesetNameChange = (e) => {
    setImagesetName(e.target.value);
    if (error) setError("");
    if (message) setMessage("");
  };

  const handleImagesetSelect = (e) => {
    setSelectedImageset(e.target.value);
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div>
      <Navbar />

      {/* Heading */}
      <div className="text-4xl text-center text-neutral-300 mb-8 mt-6">
        Create Project
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-8 ">
        <div className="bg-neutral-800 rounded-3xl text-neutral-400 p-2 px-6">Create Project</div>
        <div className="h-0.5 w-16 bg-red-800 mt-4"></div>
        <div className="bg-neutral-800 rounded-3xl text-neutral-400 p-2 px-8">Create Plan</div>
        <div className="h-0.5 w-16 bg-red-800 mt-4"></div>
        <div className="bg-neutral-900 border border-neutral-400 rounded-3xl text-neutral-400 p-2 px-6">Create Imageset</div>
        <div className="h-0.5 w-16 bg-red-800 mt-4"></div>
        <div className="bg-neutral-800 rounded-3xl text-neutral-400 p-2 px-6">Upload Images</div>
      </div>

      {/* Container */}
      <div className="w-full flex justify-center items-center">
        <div className="h-[550px] pl-4 w-11/12 bg-neutral-900 rounded-3xl">
          <div className="flex justify-between p-8">
            <div>
              <h1 className="text-md text-neutral-400 mb-2">Imageset Name</h1>
              <input
                type="text"
                placeholder="Enter Imageset Name"
                className="w-full p-1 px-6 rounded-md bg-neutral-800"
                value={imagesetName}
                onChange={handleImagesetNameChange}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {message && <p className="text-green-500 mt-2">{message}</p>}
            </div>

            <div>
              <h1 className="text-md text-neutral-400 mb-2">Select Imageset</h1>
              <select
                className="w-full p-1 px-10 rounded-md bg-neutral-800"
                value={selectedImageset}
                onChange={handleImagesetSelect}
              >
                <option value="" disabled>
                  Select Imageset
                </option>
                {existingImagesets.map((imageset, index) => (
                  <option key={index} value={imageset.folderName}>
                    {imageset.folderName} {/* Use folderName as per your schema */}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                className="bg-neutral-400 text-neutral-900 font-semibold p-1 px-8 rounded-lg mt-4"
                onClick={handleClick}
                disabled={imagesetName.trim() === ""}
              >
                Next
              </button>
            </div>
          </div>
          <div className="p-4 pl-8">
            <div className="bg-neutral-500 w-40 h-40 rounded-lg mb-1"></div>
            <p className="text-md text-neutral-400 font-semibold">Sample_Image</p>
            <p className="text-sm text-neutral-500">10th July</p>
          </div>
        </div>
      </div>
      {popup && <Uploadimages closePopup={closePopup} />}
    </div>
  );
}

export default CreateImageset;
