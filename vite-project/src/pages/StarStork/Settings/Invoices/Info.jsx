import React from "react";
import Menu from "../Menu";
import Data from "./Data";
import Navbar from "../../../../components/Navbar";

const Info = () => {
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <div className="bg-black h-fit flex justify-center ">
        <div className="bg-neutral-950 flex flex-col lg:flex-row mx-6 lg:mx-5 lg:my-5 h-[700px] w-full lg:w-full rounded-3xl">
          <div className="w-1/6  overflow-hidden p-4 ml-5 py-24 flex-col">
            <Menu />
          </div>
          <div className="w-full bg-neutral-950 lg:w-10/12 ">
            <Data />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
