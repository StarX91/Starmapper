import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbartwo from "../Navbar/Navbartwo";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import AssetsModal from "./Modals/AssetsModal";
import ImportPopup from "./Modals/ImportPopup";
import Imageset from "./Imagesets/Imageset";

const Images = () => {
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [showImageset, setShowImageset] = useState(false);
  const [images, setImages] = useState([]);

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return; // No UID, don't fetch images

      try {
        const response = await axios.get(
          `http://localhost:5000/get-images/starmarg/${uid}`
        );
        setImages(response.data.images); // Assuming 'images' is an array of Base64 strings
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, [uid]);

  const handleOpenAssetsModal = () => {
    setIsAssetsModalOpen(true);
  };

  const handleCloseAssetsModal = () => {
    setIsAssetsModalOpen(false);
  };

  const handleOpenImportPopup = () => {
    setIsImportPopupOpen(true);
  };

  const handleCloseImportPopup = () => {
    setIsImportPopupOpen(false);
  };

  const handleOpenImageset = () => {
    setShowImageset(true); // This will show the Imageset component
  };

  if (showImageset) {
    return <Imageset />; // Show Imageset component if button clicked
  }

  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans">
      <Navbartwo />

      <div className="p-6">
        <div className="flex justify-start items-center mb-4">
          <button
            className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-300"
            onClick={handleOpenImageset}
          >
            <span className="material-icons">
              <IoIosArrowBack />
            </span>
            <span className="text-md">Imageset_Sample</span>
          </button>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-6 min-h-[650px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">
              Images ({images.length})
            </h2>

            <div className="flex space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 pl-4 bg-neutral-800 text-neutral-300 rounded-lg w-64 border border-neutral-600 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300">
                  <FaSearch />
                </button>
              </div>

              <button
                onClick={handleOpenAssetsModal}
                className="bg-neutral-800 text-neutral-400 px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700"
              >
                + Add Assets
              </button>

              <button
                onClick={handleOpenImportPopup}
                className="bg-neutral-800 text-neutral-400 px-4 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700"
              >
                + Import Assets
              </button>
            </div>
          </div>

          {/* Display Uploaded Images */}
          <div className="grid grid-cols-4 gap-4">
            {uid ? (
              images.length > 0 ? (
                images.map((image, index) => (
                  <div
                    key={index}
                    className="border border-neutral-500 p-2 rounded-lg"
                  >
                    {image.data ? (
                      <a
                        href={`data:image/png;base64,${image.data}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`data:image/png;base64,${image.data}`}
                          alt={`Image ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </a>
                    ) : image.driveLink ? (
                      <a
                        href={image.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={image.driveLink}
                          alt={`Drive Image ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-neutral-500">No images uploaded.</p>
              )
            ) : (
              <p className="text-neutral-500">Please log in to view your images.</p>
            )}
          </div>
        </div>
      </div>

      <AssetsModal
        show={isAssetsModalOpen}
        onClose={handleCloseAssetsModal}
      />
      <ImportPopup
        show={isImportPopupOpen}
        onClose={handleCloseImportPopup}
      />
    </div>
  );
};

export default Images;
