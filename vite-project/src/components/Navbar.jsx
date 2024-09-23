// Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Starx from "../assets/Group 101.svg";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { useProfile } from "../context/ProfileImageContext";
import { ProfileContext } from "../context/ProfileContext";
import { GrServices } from "react-icons/gr";
import { GiFlatStar } from "react-icons/gi";
import { TfiHelpAlt } from "react-icons/tfi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { image } = useProfile();
  const { profileImg } = useContext(ProfileContext);
  console.log(image);

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

  const handleDashboard = () => {
    navigate("/services");
  };

  return (
    <div>
      <div className="h-12 bg-black flex justify-between">
        <div className=" pl-2">
          <img src={Starx} className="px-1 h-20 w-20 md:h-20 md:w-20" />
        </div>
        <div className="flex mt-2">
          <Link to="/services">
            <button
              className="w-20 h-14 mx-6 my-1 py-1 rounded-md flex flex-col items-center"
              onClick={handleDashboard}
            >
              <GrServices className="text-zinc-300 w-8 h-8" />
              <p className="text-zinc-300 text-xs md:text-md font-semibold">
                Services
              </p>
            </button>
          </Link>

          <Link to="/ss/dashboard">
            <button className="bg-zinc-900 w-20 h-14 mx-6 my-1 py-1 rounded-md flex flex-col items-center">
              <GiFlatStar className="text-zinc-300 w-8 h-8" />
              <p className="text-zinc-300 text-xs md:text-sm font-bold">
                Star Stork
              </p>
            </button>
          </Link>
          <Link to="/ss/settings">
            <button className="w-20 h-14 mx-6 my-1 py-1 rounded-md flex flex-col items-center">
              <IoSettingsSharp className="text-zinc-300 w-8 h-8" />
              <p className="text-zinc-300 text-xs md:text-sm font-semibold">
                Settings
              </p>
            </button>
          </Link>
          <button className="w-20 h-14 mx-4 pr-4 my-1 py-1 rounded-md flex flex-col items-center">
            <TfiHelpAlt className="text-neutral-300  w-10 h-10" />
            <p className="text-zinc-300  text-sm md:text-sm font-semibold">
              Help
            </p>
          </button>
        </div>
        <div className="relative">
          
        <img src={image} alt="" />
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
      <div className="w-full h-0.5 mt-8  bg-red-800"></div>
    </div>
  );
};

export default Navbar;
