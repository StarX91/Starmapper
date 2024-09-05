/*import React from "react";

const Sidebar = ({ name, arrow }) => {
  return (
    <div className="flex mb-2 border-2 border-neutral-400  lg:my-10 h-28 w-full lg:w-7/12 rounded-2xl ">
      <div className="flex flex-col justify-center ml-4">
        <p className="text-6xl text-neutral-300 ">0</p>
        <div className="flex justify-between">
          <p className="text-neutral-300 text-xl ">{name}</p>
          <button className="flex justify-end text-white text-3xl ">
            {arrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; */

/*import React from "react";

const Sidebar = ({ name, arrow }) => {
  return (
    <div className="flex mb-4 border-2 border-neutral-400 h-20 sm:h-24 md:h-28 w-full rounded-2xl">
      <div className="flex flex-col justify-center ml-4 w-full">
        <p className="text-4xl sm:text-5xl md:text-6xl text-neutral-300">0</p>
        <div className="flex justify-between items-center">
          <p className="text-neutral-300 text-lg sm:text-xl">{name}</p>
          <button className="flex justify-end text-white text-2xl sm:text-3xl pr-4">
            {arrow}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar; */
import React from "react";

const Sidebar = ({ name, icon }) => {
  return (
    <div className="flex mb-4 border-2 border-neutral-400 h-16 sm:h-20 md:h-24 w-full rounded-xl">
      <div className="flex flex-col justify-center ml-4 w-full">
        <p className="text-3xl sm:text-4xl md:text-5xl text-neutral-300">0</p>
        <div className="flex justify-between items-center">
          <p className="text-neutral-300 text-md sm:text-lg">{name}</p>
          <button className="flex justify-end text-white text-xl sm:text-2xl pr-4">
            {icon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
