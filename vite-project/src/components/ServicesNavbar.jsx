import React, { useState, useEffect, useRef } from "react";
//import Starx from "./assets/starx91.jpg";
import starx from "../assets/new_logo.svg";
import { MdDashboard } from "react-icons/md";
import { PiDroneFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GrServices } from "react-icons/gr";
import { FaCircle } from "react-icons/fa6";
import { IoIosPeople, IoIosAddCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileImageContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("services");
  const [squarePosition, setSquarePosition] = useState(null); // State to track the position of the active button
  const navigate = useNavigate();
  const buttonsRef = useRef({});
  const { image } = useProfile();

  useEffect(() => {
    // Move the square to the active button's position after the first render
    moveSquareToActiveButton();
  }, [activeButton]);

  useEffect(() => {
    // On initial render, move the square to the initial active button's position
    moveSquareToActiveButton();
  }, []);

  const handleButtonClick = (buttonName, path) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  const moveSquareToActiveButton = () => {
    const button = buttonsRef.current[activeButton];
    if (button) {
      const rect = button.getBoundingClientRect();
      const navbarRect = button.parentElement.getBoundingClientRect();
      const left = rect.left - navbarRect.left;
      setSquarePosition(left);
    }
  };

  return (
    <div>
      <div className="h-12 bg-black flex justify-between relative">
        <div className="pt-3 pl-2">
          <img src={starx} className="px-4 mt-1 w-full size-[50px] " />
        </div>
        <div className="flex relative p-4 space-x-2">
          <div
            className="absolute h-16 ml-3 bg-neutral-800 transition-all duration-300 rounded-md"
            style={{ left: squarePosition, width: "80px" }}
          />

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
          <button
            ref={(el) => (buttonsRef.current["dashboard"] = el)}
            onClick={() => handleButtonClick("dashboard", "/services")}
            className={`w-24 h-14 my-1  rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "dashboard" ? "text-white" : "text-zinc-400"
            }`}
          >
            <MdDashboard className="w-20 h-16 text-neutral-400" />
            <p className="text-[10px] font-semibold">Dashboard</p>
          </button>
          {/* <button
            onClick={() => handleButtonClick("drones", "/drones")}
            ref={(el) => (buttonsRef.current["drones"] = el)}
            className={`w-20 h-10 my-1 rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "drones" ? "text-white" : "text-zinc-400"
            }`}
          >
            <PiDroneFill className="w-8 h-8" />
            <p className="text-[12px] font-semibold">Drones</p>
          </button> */}
          <button
            ref={(el) => (buttonsRef.current["controlCenter"] = el)}
            onClick={() =>
              handleButtonClick("controlCenter", "/control-center")
            }
            className={`w-28 h-24 my-2 rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "controlCenter" ? "text-white" : "text-zinc-400"
            }`}
          >
            <SlCalender className="w-10 h-8" /> {/* Increased size */}
            <p className="text-[9px] my-1 font-bold text-center">Planner</p>
          </button>
          <button
            ref={(el) => (buttonsRef.current["teams"] = el)}
            onClick={() => handleButtonClick("teams", "/teams")}
            className={`w-36 h-24  rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "teams" ? "text-white" : "text-zinc-400"
            }`}
          >
            <IoIosPeople className="w-12 h-10 " />
            <p className="text-[12px] font-semibold">Teams</p>
          </button>
          <button
            onClick={() => handleButtonClick("settings", "/settings")}
            ref={(el) => (buttonsRef.current["settings"] = el)}
            className={`w-20 h-20 my-2 rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "settings" ? "text-white" : "text-zinc-400"
            }`}
          >
            <IoSettingsSharp className="w-8 h-8" />
            <p className="text-[12px] font-semibold">Settings</p>
          </button>
          <button
            ref={(el) => (buttonsRef.current["add"] = el)}
            onClick={() => handleButtonClick("add", "/add")}
            className={`w-32 h-36 my-1 rounded-sm flex flex-col items-center relative z-10 ${
              activeButton === "add" ? "text-white" : "text-zinc-400"
            }`}
          >
            <IoIosAddCircle className="w-12 h-9" />
            <p className="text-[12px] font-semibold">Add</p>
          </button>
        </div>
        <div className="relative">
          <button
            className="w-8 h-8 m-4 mr-8 rounded-full bg-black focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-5xl rounded-full  md:my-0 mx-auto md:mx-0 text-neutral-800">
                <FaCircle />
              </span>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black text-neutral-300  rounded-md shadow-lg py-1 z-20">
              <button
                onClick={() =>
                  handleButtonClick("editProfile", "/services/edit-profile")
                }
                className="block px-4 py-2 text-sm hover:text-neutral-900 hover:bg-gray-100   w-full text-left"
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleButtonClick("settings", "/settings")}
                className="block px-4 py-2 text-sm hover:text-neutral-900 hover:bg-gray-100  w-full text-left"
              >
                Settings
              </button>
              <button
                onClick={() => handleButtonClick("logout", "/")}
                className="block px-4 py-2 text-sm hover:text-neutral-900 hover:bg-gray-100  w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-0.5 mt-10 bg-red-900"></div>
    </div>
  );
};

export default Navbar;
