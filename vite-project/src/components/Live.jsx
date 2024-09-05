/*import React from "react";
import { FaImages, FaCube, FaTasks, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdKeyboardArrowRight } from "react-icons/md";

const Live = () => {
  return (
    <>
      <div className="flex-col md:ml-20 flex justify-center md:w-10/12 lg:w-80">
        <Sidebar name="Images" />
        <Sidebar name="Objects" />
        <Link to="/ss/dashboard/tasks">
          <div className="flex border-2 border-neutral-400 mb-2 lg:my-4 h-28 w-full lg:w-7/12 rounded-2xl ">
            <div className="flex flex-col justify-center ml-4">
              <p className="text-6xl text-neutral-300 ">0</p>
              <div className="flex justify-between">
                <p className="text-neutral-300 text-xl ">Task</p>
                <button className="flex justify-end text-white text-3xl ">
                  {<MdKeyboardArrowRight />}
                </button>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/ss/dashboard/detectors">
          <div className="flex border-2 border-neutral-400 mb-2 lg:my-10 h-28 w-full lg:w-7/12 rounded-2xl ">
            <div className="flex flex-col justify-center ml-4">
              <p className="text-6xl text-neutral-300 ">0</p>
              <div className="flex justify-between">
                <p className="text-neutral-300 text-xl ">Detectors</p>
                <button className="flex justify-end text-white text-3xl ">
                  {<MdKeyboardArrowRight />}
                </button>
              </div>
            </div>
          </div>
        </Link>
        <Sidebar name="Data" />
      </div>
    </>
  );
};

export default Live; */

/*import React from "react";
import { FaImages, FaCube, FaTasks, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdKeyboardArrowRight } from "react-icons/md";

const Live = () => {
  return (
    <div className="flex-col md:ml-20 lg:mt-20 flex justify-center w-full sm:w-11/12 md:w-10/12 lg:w-48">
      <Sidebar name="Images" icon={<FaImages />} />
      <Sidebar name="Objects" icon={<FaCube />} />
      <Link to="/ss/dashboard/tasks">
        <div className="flex border-2 border-neutral-400   h-20 sm:h-24 md:h-28 w-full rounded-2xl">
          <div className="flex flex-col justify-center ml-4 w-full">
            <p className="text-4xl sm:text-5xl md:text-6xl text-neutral-300">
              0
            </p>
            <div className="flex justify-between items-center">
              <p className="text-neutral-300 text-lg sm:text-xl">Task</p>
              <button className="flex justify-end text-white text-2xl sm:text-3xl pr-4">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/ss/dashboard/detectors">
        <div className="flex border-2 border-neutral-400 mb-2 lg:my-4 h-20 sm:h-24 md:h-28 w-full rounded-2xl">
          <div className="flex flex-col justify-center ml-4 w-full">
            <p className="text-4xl sm:text-5xl md:text-6xl text-neutral-300">
              0
            </p>
            <div className="flex justify-between items-center">
              <p className="text-neutral-300 text-lg sm:text-xl">Detectors</p>
              <button className="flex justify-end text-white text-2xl sm:text-3xl pr-4">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Sidebar name="Data" icon={<FaSearch />} />
    </div>
  );
};

export default Live; */
/*import React from "react";
import { FaImages, FaCube, FaTasks, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdKeyboardArrowRight } from "react-icons/md";

const Live = () => {
  return (
    <div className="flex-col md:ml-20 lg:mt-20 flex justify-center w-full sm:w-11/12 md:w-10/12 lg:w-8/12">
      <Sidebar name="Images" icon={<FaImages />} />
      <Sidebar name="Objects" icon={<FaCube />} />
      <Link to="/ss/dashboard/tasks">
        <div className="flex border-2 border-neutral-400 h-16 sm:h-20 md:h-24 w-full rounded-xl">
          <div className="flex flex-col justify-center ml-4 w-full">
            <p className="text-3xl sm:text-4xl md:text-5xl text-neutral-300">
              0
            </p>
            <div className="flex justify-between items-center">
              <p className="text-neutral-300 text-md sm:text-lg">Task</p>
              <button className="flex justify-end text-white text-xl sm:text-2xl pr-4">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/ss/dashboard/detectors">
        <div className="flex border-2 border-neutral-400 mb-2 lg:my-4 h-16 sm:h-20 md:h-24 w-full rounded-xl">
          <div className="flex flex-col justify-center ml-4 w-full">
            <p className="text-3xl sm:text-4xl md:text-5xl text-neutral-300">
              0
            </p>
            <div className="flex justify-between items-center">
              <p className="text-neutral-300 text-md sm:text-lg">Detectors</p>
              <button className="flex justify-end text-white text-xl sm:text-2xl pr-4">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Sidebar name="Data" icon={<FaSearch />} />
    </div>
  );
};

export default Live; */

import React from "react";
import { FaImages, FaCube, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdKeyboardArrowRight } from "react-icons/md";

const Live = () => {
  return (
    <div className="flex-col md:ml-20 lg:mt-20 flex justify-center w-full sm:w-11/12 md:w-8/12 lg:w-7/12">
      <Sidebar name="Images" icon={<FaImages />} />
      <Sidebar name="Objects" icon={<FaCube />} />
      <Link to="/ss/dashboard/tasks">
        <div className="flex border-2 border-neutral-400 h-16 sm:h-20 md:h-24 w-full rounded-xl">
          <div className="flex flex-col justify-center ml-4 w-full">
            <p className="text-3xl sm:text-4xl md:text-5xl text-neutral-300">
              0
            </p>
            <div className="flex justify-between items-center">
              <p className="text-neutral-300 text-md sm:text-lg">Task</p>
              <button className="flex justify-end text-white text-xl sm:text-2xl pr-4">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/ss/dashboard/detectors">
        <div className="flex border-2 border-neutral-400 mb-2 lg:my-4 h-16 sm:h-20 md:h-24 w-full rounded-xl">
          <div className="flex flex-col justify-center ml-4 w-full">
            <p className="text-3xl sm:text-4xl md:text-5xl text-neutral-300">
              0
            </p>
            <div className="flex justify-between items-center">
              <p className="text-neutral-300 text-md sm:text-lg">Detectors</p>
              <button className="flex justify-end text-white text-xl sm:text-2xl pr-4">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Sidebar name="Data" icon={<FaSearch />} />
    </div>
  );
};

export default Live;
