import React, { useState } from "react";
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
        {/* Header Section */}
        <div className="flex justify-start items-center mb-4">
          <button
            className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-300"
            onClick={handleOpenImageset} // Open Imageset on button click
          >
            <span className="material-icons">
              <IoIosArrowBack />
            </span>
            <span className="text-md">Imageset_Sample</span>
          </button>
        </div>

        {/* Images Container */}
        <div className="bg-neutral-900 rounded-3xl p-6 min-h-[650px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">Images (0)</h2>

            {/* Search and Button Section */}
            <div className="flex space-x-6">
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 pl-4 bg-neutral-800 text-neutral-300 rounded-md focus:outline-none"
                />
                <span className="absolute right-3 top-3 text-neutral-500">
                  <i>
                    <FaSearch />
                  </i>
                </span>
              </div>

              <button
                onClick={handleOpenAssetsModal}
                className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800"
              >
                + Assets
              </button>
              <button
                onClick={handleOpenImportPopup} // Open Import Popup on button click
                className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800"
              >
                + Images
              </button>
            </div>
          </div>

          {/* Add further image-related content here */}
        </div>
      </div>

      {/* Modal Components */}
      <AssetsModal show={isAssetsModalOpen} onClose={handleCloseAssetsModal} />
      <ImportPopup show={isImportPopupOpen} onClose={handleCloseImportPopup} />
    </div>
  );
};

export default Images;

/*import React from "react";
import Navbartwo from "../Navbar/Navbartwo";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Images = () => {
  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans">
      <Navbartwo />

      <div className="p-6">
        {/* Header Section *
        <div className="flex justify-start items-center mb-4">
          <button className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-300">
            <span className="material-icons">
              <IoIosArrowBack />
            </span>
            <span className="text-md">Images Folder</span>
          </button>
        </div>

        {/* Images Container 
        <div className="bg-neutral-900 rounded-3xl p-6 min-h-[650px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">Images (0)</h2>

            {/* Search and Button Section 
            <div className="flex space-x-6">
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 pl-4 bg-neutral-800 text-neutral-300 rounded-md focus:outline-none"
                />
                <span className="absolute right-3 top-3 text-neutral-500">
                  <i>
                    <FaSearch />
                  </i>
                </span>
              </div>

              <button className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800">
                + Assets
              </button>
              <button className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800">
                + Images
              </button>
            </div>
          </div>

          {/* Add further image-related content here 
        </div>
      </div>
    </div>
  );
};

export default Images; */
