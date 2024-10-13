
import React from "react";
import Menu from "../Menu";

import Navbar from "../../../../components/ServicesNavbar";
import UsageStatsDashboard from "../../Dashboard/UsageStatistics";

const StatComp = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="bg-black flex justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-neutral-950 flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl mx-auto">
          <div className="w-full lg:w-1/4 xl:w-1/5 overflow-hidden p-4 lg:p-6">
            <Menu />
          </div>
          <div className="w-full lg:w-3/4 xl:w-4/5 p-4 lg:p-6">
            <UsageStatsDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatComp;
