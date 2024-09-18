import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Navbartwo from "../../Navbar/Navbartwo";

const Imageset = () => {
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);

  const handleOpenAssetsModal = () => {
    setIsAssetsModalOpen(true);
  };

  const handleCloseAssetsModal = () => {
    setIsAssetsModalOpen(false);
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans">
      <Navbartwo />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-start items-center mb-4">
          <button className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-300">
            <span className="material-icons">
              <IoIosArrowBack />
            </span>
            <span className="text-md">Plan_Name</span>
          </button>
        </div>

        {/* Images Container */}
        <div className="bg-neutral-900 rounded-3xl p-6 min-h-[650px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">All (0)</h2>

            {/* Search and Button Section */}
            <div className="flex space-x-6">
              <button
                onClick={handleOpenAssetsModal}
                className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800"
              >
                + Imageset
              </button>
            </div>
          </div>

          {/* Imageset Placeholder */}
          <div className="grid grid-cols-7 gap-4 mt-6">
            <div className=" rounded-xl p-6 text-center">
              <div className="bg-neutral-700 h-48 mb-4 rounded-md"></div>
              <div className="text-left">
                <h3 className="text-neutral-400 text-sm">Sample_Images</h3>
                <p className="text-neutral-600 text-xs">10 June 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Modal */}
      {/* You can implement the AssetsModal as per your needs */}
    </div>
  );
};

export default Imageset;
