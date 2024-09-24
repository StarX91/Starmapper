import React, { useState } from "react";
import Navbartwo from "../Navbar/Navbartwo";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import AssetsModal from "./Modals/AssetsModal";
import ImportPopup from "./Modals/ImportPopup";
import Imageset from "./Imagesets/Imageset";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Plans = () => {
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [showImageset, setShowImageset] = useState(false);
  const navigate = useNavigate();

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
    setShowImageset(true);
  };

  const handleViewAllImages = () => {
    navigate("/images");
  };

  const handleViewAllTasks = () => {
    navigate("/tasks");
  };

  if (showImageset) {
    return <Imageset />;
  }

  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans">
      <Navbartwo />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-start items-center mb-4">
          <button
            className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-300 p-2"
            onClick={handleOpenImageset}
          >
            <IoIosArrowBack />
            <span className="text-md">StarMarg_Sample</span>
          </button>
        </div>

        {/* Maps Section */}
        <div className="bg-neutral-900 rounded-3xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">Maps (1)</h2>
            <button className="text-neutral-400 hover:text-neutral-300 border border-neutral-400 rounded-lg p-2">
              <span className="border-cyan-50">View All</span>
            </button>
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg">
            <div className="w-40 h-40 rounded-lg bg-neutral-500 mb-2"></div>
            <div className="text-neutral-300">Map_Sample</div>
            <div className="text-neutral-500">2.89 GB - 21 July 2024</div>
          </div>
        </div>

        {/* Imagesets Section */}
        <div className="bg-neutral-900 rounded-3xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">Imagesets (2)</h2>
            <div>
               
               
              <button className="text-neutral-400 m-2 hover:text-neutral-300 border border-neutral-400 rounded-lg p-2"
               onClick={handleViewAllImages}
              >
                View All
              </button>
         
              <button 
                className="text-neutral-400 m-2 hover:text-neutral-300 border border-neutral-400 rounded-lg p-2"
                onClick={handleOpenImportPopup}
              >
                Imageset +
              </button>
              <button className="text-neutral-400 m-2 hover:text-neutral-300 border border-neutral-400 rounded-lg p-2">
                View Map
              </button>
            </div>
          </div>
          <div className="flex flex-wrap space-x-4">
            <div className="bg-neutral-800 p-4 rounded-lg w-full sm:w-1/2 lg:w-1/4">
              <div className="w-40 h-40 rounded-lg bg-neutral-500 mb-2"></div>
              <div className="text-neutral-300">Image_Sample</div>
              <div className="text-neutral-500">19 June 2024</div>
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg w-full sm:w-1/2 lg:w-1/4">
              <div className="w-40 h-40 rounded-lg bg-neutral-500 mb-2"></div>
              <div className="text-neutral-300">Image_Sample</div>
              <div className="text-neutral-500">19 June 2024</div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-neutral-500 text-xl">Tasks (1)</h2>
          <button className="text-neutral-400 hover:text-neutral-300 border border-neutral-400 rounded-lg p-2"
          onClick={handleViewAllTasks}
          >
            View All
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <button className="text-neutral-500 p-2">
            Completed (1)
          </button>
          <button className="text-neutral-500 p-2">
            In Progress (0)
          </button>
          <button className="text-neutral-500 p-2">
            Pending (0)
          </button>
          <button className="text-neutral-500 p-2">
            Failed (0)
          </button>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-6">
          <div className="bg-neutral-800 p-4 rounded-lg">
            <div className="flex justify-between bg-black text-neutral-500">
              <span>Name</span>
              <span>Status</span>
              <span>Images</span>
              <span>Plan</span>
              <span>Date Created</span>
            </div>

            <div className="text-neutral-300 m-3"></div>
            <div className="flex justify-between text-neutral-500">
              <span>Dataset_1</span>
              <span>Completed</span>
              <span>481 Images</span>
              <span>Drone_Sample</span>
              <span>7 Aug 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <AssetsModal show={isAssetsModalOpen} onClose={handleCloseAssetsModal} />
      <ImportPopup show={isImportPopupOpen} onClose={handleCloseImportPopup} />
    </div>
  );
};

export default Plans;