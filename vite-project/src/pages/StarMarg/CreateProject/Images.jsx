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
  const [loading, setLoading] = useState(true); // To handle loading state

  const uid = localStorage.getItem("uid");
  const projectName = localStorage.getItem("projectName");
  const subfolderName = localStorage.getItem("planName");
  const imagesetName = localStorage.getItem("imagesetName");

  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return;

      try {
        const response = await axios.get(`http://localhost:5000/get-images/starmarg/${uid}`, {
          params: {
            projectName,
            subfolderName,
            imagesetName,
          },
        });

        // Check if there are images and set the state accordingly
        if (response.data.images) {
          setImages(response.data.images);
        } else {
          setImages([]); // In case no images are found
        }
      } catch (error) {
        console.error("Error fetching images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [uid, projectName, subfolderName, imagesetName]);

  const handleOpenAssetsModal = () => setIsAssetsModalOpen(true);
  const handleCloseAssetsModal = () => setIsAssetsModalOpen(false);
  const handleOpenImportPopup = () => setIsImportPopupOpen(true);
  const handleCloseImportPopup = () => setIsImportPopupOpen(false);

  const handleOpenImageset = () => setShowImageset(true);

  if (showImageset) return <Imageset />;

  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans">
      <Navbartwo />
      <div className="p-6">
        <div className="flex justify-start items-center mb-4">
          <button
            className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-300"
            onClick={handleOpenImageset}
          >
            <IoIosArrowBack />
            <span className="text-md">Imageset_Sample</span>
          </button>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-6 min-h-[650px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">Images ({images.length})</h2>

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
            {loading ? (
              <p className="text-neutral-500">Loading images...</p>
            ) : images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="border border-neutral-500 p-2 rounded-lg">
                  {image.base64 ? (
                    <a
                      href={`data:image/png;base64,${image.base64}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`data:image/png;base64,${image.base64}`}
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
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-neutral-500">No images uploaded.</p>
            )}
          </div>
        </div>
      </div>

      <AssetsModal show={isAssetsModalOpen} onClose={handleCloseAssetsModal} />
      <ImportPopup show={isImportPopupOpen} onClose={handleCloseImportPopup} />
    </div>
  );
};

export default Images;
