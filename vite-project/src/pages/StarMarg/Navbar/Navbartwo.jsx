import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/ProfileImageContext";
import { ProfileContext } from "../../../context/ProfileContext";
import Starx from "../../../assets/Group 101.svg";
import { GiFlatStar } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { GrServices } from "react-icons/gr";
import { IoIosHelpCircle } from "react-icons/io";
import { FaFolder } from "react-icons/fa";
import { IoImageSharp } from "react-icons/io5";

const Navbartwo = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // Add activeButton state
  const navigate = useNavigate();
  const { image } = useProfile();
  const buttonsRef = useRef({});
  const { profileImg } = useContext(ProfileContext);

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/");
    console.log("Logged out");
  };

  const handleEditProfile = () => {
    navigate("/ss/edit-profile");
  };

  const handleSettings = () => {
    navigate("/ss/settings");
  };

  const handleButtonClick = (buttonName, path) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between bg-black w-full h-auto md:h-21  items-center">
        {/* Logo Section */}
        <div className="flex w-full md:w-36 mb-4 md:mb-0 mx-auto md:mx-0 h-12 items-center justify-start">
          <img src={Starx} alt="starx logo" className="w-20 md:h-24 md:w-20" />
        </div>

        {/* Button Section */}
        <div className="flex justify-center md:space-x-8 md:justify-center w-full md:mr-10 md:w-1/4 ">
          <button
            ref={(el) => (buttonsRef.current["services"] = el)}
            onClick={() => handleButtonClick("services", "/services")}
            className={`w-28 h-12 my-2 rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "services" ? "text-white" : "text-zinc-400"
            }`}
          >
            <GrServices className="w-12 h-12" /> {/* Increased size */}
            <p className="text-[11px] font-semibold">Services</p>
          </button>
          <button className=" w-20 h-14 mx-2 my-1 py-1 rounded-md flex flex-col items-center">
            <GiFlatStar className="text-zinc-300 w-20 h-8" />
            <p className="text-zinc-300 text-xs md:text-sm font-bold">
              Star Marg
            </p>
          </button>
          <button className=" w-20 h-14 mx-2 my-1 py-1 rounded-md flex flex-col items-center">
            <FaFolder className="text-zinc-300 w-20 h-8" />
            <p className="text-zinc-300 text-xs md:text-sm font-semibold">
              Plan
            </p>
          </button>
          <button className="w-20 h-14 mx-2 my-1 py-1 rounded-md flex flex-col items-center">
            <IoSettingsSharp className="text-zinc-300 w-8 h-8" />
            <p className="text-zinc-300 text-xs md:text-sm font-semibold">
              Imageset
            </p>
          </button>
          <button className="bg-zinc-900 px-3 w-20 h-14 mx-2 my-1 py-1 rounded-md flex flex-col items-center">
            <IoImageSharp className="text-zinc-300 w-8 h-8" />
            <p className="text-zinc-300 text-xs md:text-sm font-semibold">
              Images
            </p>
          </button>
          <button className="w-20 h-14 mx-2 my-1 py-1 rounded-md flex flex-col items-center">
            <IoIosHelpCircle className="text-zinc-300 w-8 h-8" />
            <p className="text-zinc-300 text-xs md:text-sm font-semibold">
              Help
            </p>
          </button>
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            className="w-8 h-8 p-6 m-4 rounded-full bg-zinc-700 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : profileImg ? (
              <div className="text-white">{profileImg}</div>
            ) : (
              <span className=" w-12 h-12  rounded-full my-4 md:my-0 mx-auto md:mx-0"></span>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black text-neutral-400  rounded-md shadow-lg py-1 z-20">
              <button
                onClick={handleEditProfile}
                className="block px-4 py-2 text-sm  hover:bg-neutral-300 w-full text-left"
              >
                Edit Profile
              </button>
              <button
                onClick={handleSettings}
                className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm  hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-0.5 mb-2  bg-red-800"></div>
    </div>
  );
};

export default Navbartwo;
