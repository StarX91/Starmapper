/*import React from "react";
import Live from "../../../components/Live";
import Dashboard from "./Dashboard";
import Navbar from "../../../components/Navbar";

const Tmain = () => {
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <div className="bg-black h-fit flex justify-center ">
        <div className=" flex flex-col lg:flex-row mx-6 lg:mx-5 lg:my-5  w-full lg:w-full rounded-3xl">
          <div className="w-10/12 overflow-hidden p-4 ml-5 py-24 flex-col">
            <Live />
          </div>
          <div className="w-full lg:w-10/12 ">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tmain; */

import React from "react";
import Live from "../../../components/Live";
import Dashboard from "./Dashboard";
import Navbar from "../../../components/Navbar";

const Tmain = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col lg:flex-row p-4 lg:p-8 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <Live />
        </div>
        <div className="w-full lg:w-2/3 xl:w-3/4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Tmain;
