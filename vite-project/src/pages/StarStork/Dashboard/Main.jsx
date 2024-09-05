import React from "react";
import Live from "../../../components/Live";
import Dashboard from "./Dashboard";
import Navbar from "../../../components/Navbar";

const Main = () => {
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <div className="bg-black h-fit flex justify-center ">
        <div className=" flex flex-col lg:flex-row mx-6 lg:mx-5 lg:my-5  w-full lg:w-full rounded-3xl">
          <div className="w-1/6  overflow-hidden p-4 ml-5 py-12 flex-col">
            <Live />
          </div>
          <div className="w-full  lg:w-10/12 p-8 ">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
