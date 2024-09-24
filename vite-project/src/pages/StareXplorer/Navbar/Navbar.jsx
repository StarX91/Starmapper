import React, { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaVectorSquare } from "react-icons/fa6";
import { FaUndo, FaRedo } from "react-icons/fa";
import { TbRouteSquare } from "react-icons/tb";
import { useProfile } from "../../../context/ProfileImageContext"

import { useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
import SatelliteMode from "./SatelliteMode";
// import { motion } from "framer-motion";

const options = [
  { label: "Satellite Mode", value: 1 },
  { label: "Terrain", value: 2 },
  { label: "Traffic", value: 3 },
];

const clientId = "261778488059-r3p7jn1uctichj37qi3kq21j1fghclns.apps.googleusercontent.com";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { image } = useProfile();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    console.log("Logout successful!");
    navigate('/');
  };

  const { signOut } = useGoogleLogout({
    
    clientId,
    onLogoutSuccess,
    cookiePolicy: 'single_host_origin',

  });

  const edit=()=>{
    navigate('/edit-profile')
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
    className={`flex justify-between 
    mobile  w-full h-10
    14-inch laptop: lg:h-12
    card ${theme === 'Dark' 
      ? 'transition bg-neutral-900 duration-300 ' 
      : 'transition bg-zinc-200 duration-300 '}`}>
      <div 
      className={`rounded-md 
      mobile  px-2 py-1 my-2 ml-2 text-xs
      14-inch laptop: lg:my-3 lg:text-sm lg:py-0
      card ${theme === 'Dark'
        ? 'transition duration-100 bg-white' 
        : 'transition duration-100 bg-black'}`}>
        <button 
        onClick={toggleTheme} 
        className={`
          font-semibold
        card ${theme === 'Dark' 
          ? 'transition duration-300 text-black' 
          : 'transition duration-300 text-white'}`}> 
          {theme} 
        </button>
      </div>
      {/* <motion.div
            className="dark-mode-toggle"
            onClick={toggleTheme}
            layout
        >
            <motion.div className={`card ${theme === 'Dark'
        ? 'transition duration-100 bg-white' 
        : 'transition duration-100 bg-black'}`} layout transition={{ duration: 0.3 }}>
                {/* Slider content */}
            {/* </motion.div> */}
        {/* </motion.div>  */}
        
      <div 
      className="flex  gap-4">
        {/* <select 
        className={` border-solid border-2 rounded-md text-zinc-500
           px-2 my-1 text-sm font-semibold
          card ${theme === 'Dark' 
            ? 'bg-zinc-800  border-zinc-900' 
            : 'bg-zinc-500  border-zinc-200'}`}>
          {options.map((option) => (
            <option key={option.value} value={option.value} className={`card ${theme === 'Dark' ? 'text-white': 'text-white'}`}>
              {option.label}
            </option>
          ))}
        </select> */}
        <SatelliteMode/>
        <button
        className={`
        card ${theme === 'Dark' 
          ? 'text-zinc-600  hover:text-zinc-500 transition duration-300' 
          : 'text-zinc-400 hover:text-zinc-500 transition duration-300'}`}>
          {/* <img className={`card ${theme === 'Dark' ? 'min-[320px]:w-7 min-[320px]:h-7 invert': 'min-[320px]:w-7 min-[320px]:h-7'}`} src={trajectory} alt="" /> */}
          <FaVectorSquare
          className="size-7"
          />
        </button>
        <button
        className={`
        card ${theme === 'Dark' 
          ? 'text-zinc-600  hover:text-zinc-500 transition duration-300' 
          : 'text-zinc-400 hover:text-zinc-500 transition duration-300'}`}>
          {/* <img className={`card ${theme === 'Dark' ? 'min-[320px]:w-7 min-[320px]:h-7 invert': 'min-[320px]:w-7 min-[320px]:h-7'}`} src={trajectory} alt="" /> */}
          <TbRouteSquare
          className="size-7"
          />
        </button>
      </div>
      <div className="flex gap-1">
        <div className="flex py-2 gap-1">
        <button
        className={`
        card ${theme === 'Dark' 
          ? 'text-zinc-600  hover:text-zinc-500 transition duration-300' 
          : 'text-zinc-400 hover:text-zinc-500 transition duration-300'}`}>
          {/* <img className={`card ${theme === 'Dark' ? 'min-[320px]:w-7 min-[320px]:h-7 invert': 'min-[320px]:w-7 min-[320px]:h-7'}`} src={trajectory} alt="" /> */}
          <FaUndo
          className="size-4"
          />
        </button>
        <button
        className={`
        card ${theme === 'Dark' 
          ? 'text-zinc-600  hover:text-zinc-500 transition duration-300' 
          : 'text-zinc-400 hover:text-zinc-500 transition duration-300'}`}>
          {/* <img className={`card ${theme === 'Dark' ? 'min-[320px]:w-7 min-[320px]:h-7 invert': 'min-[320px]:w-7 min-[320px]:h-7'}`} src={trajectory} alt="" /> */}
          <FaRedo
          className="size-4"
          />
        </button>
        </div>
        <div 
        // style={{ position: 'relative', display: 'inline-block' }}
        className="relative inline-block 
        mobile mt-0 mb-1 mx-1
        14inch laptop: lg:my-1">
          <button onClick={toggleDropdown} 
          // style={{
          //   padding: '10px 20px',
          //   borderRadius: '20px',
          //   backgroundColor: theme === 'Dark' ? 'white' : 'black',
          //   color: theme === 'Dark' ? 'black' : 'white',
          //   fontWeight: 'bold',
          //   margin: '8px 8px 8px 0'
          // }}
          className={`rounded-full font-semibold text-xs
            mobile py-0 px-0 
            14inch laptop lg:px-0 lg:py-0 mt-1
            card ${theme === 'Dark' 
              ? 'text-zinc-500 bg-zinc-700 hover:text-zinc-400 hover:bg-zinc-600' 
              : 'text-zinc-500 bg-zinc-300 hover:text-zinc-600 hover:bg-zinc-400'}`}>
              {/* <div className="flex items-center space-x-2"> */}
                {image ? (
                  <img src={image} alt="Profile Picture" className="w-8 h-8 rounded-full py-0 px-0 " />
                ): (<div className="py-3 px-3 lg:px-4 lg:py-4"/> )}  
              {/* </div> */}
          </button>
          {isDropdownOpen && (
            <div ref={dropdownRef} 
            // style={{
            //   position: 'absolute',
            //   top: 'calc(100% + 5px)',
            //   left: '0',
            //   backgroundColor: theme === 'Dark' ? 'black' : 'white',
            //   color: theme === 'Dark' ? 'white' : 'black',
            //   borderRadius: '10px',
            //   boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            //   zIndex: 1,
            //   padding: '10px'
            // }}
            className={`rounded-md absolute right-0 z-50 w-24 mt-1 origin-top-right overflow-hidden
              mobile 
              card ${theme === 'Dark' 
              ? 'text-zinc-400 bg-zinc-700' 
              : 'text-zinc-500 bg-zinc-300'}  `}
            >
              <ul>
                <li>
                  <button 
                  className={`w-full block text-center px-3 py-2 cursor-pointer text-xs hover:font-semibold 
                    card ${theme === 'Dark' 
                    ? 'hover:text-zinc-300 hover:bg-zinc-600' 
                    : 'hover:text-zinc-600 hover:bg-zinc-400'}`}
                  onClick={edit}>
                    Edit Profile
                  </button>
                </li>
                <li>
                <button 
                  className={`w-full block text-center px-3 py-2 cursor-pointer text-xs hover:font-semibold
                    card ${theme === 'Dark' 
                    ? 'hover:text-zinc-300 hover:bg-zinc-600' 
                    : 'hover:text-zinc-600 hover:bg-zinc-400'}`}
                  onClick={signOut}>
                    Log-out
                  </button>
                </li>
              </ul>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
