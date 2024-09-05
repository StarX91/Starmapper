/*import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 p-4 lg:p-8">
      <div className="flex justify-between mb-4 space-x-2">
        <StatusCard title="Completed" count="0" />
        <StatusCard title="In Progress" count="0" />
        <StatusCard title="Pending" count="0" />
        <StatusCard title="Failed" count="0" />
      </div>
      <div className="bg-neutral-900 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-400 border-b border-neutral-800">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-400 border-b border-neutral-800">
                Task type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-400 border-b border-neutral-800">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-400 border-b border-neutral-800">
                Images
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-400 border-b border-neutral-800">
                Date created
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-400 border-b border-neutral-800">
                Project
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="6"
                className="px-4 py-8 text-center text-sm text-neutral-500"
              >
                No Data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusCard = ({ title, count }) => {
  return (
    <div className="bg-neutral-900 px-4 py-2 rounded-md flex-1">
      <div className="flex items-center justify-between">
        <span className="text-neutral-400 text-sm">{title}</span>
        <span className="text-neutral-300 text-2xl font-bold">{count}</span>
      </div>
    </div>
  );
};

export default Dashboard; */
/*import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 p-4 lg:p-16 flex flex-col h-full">
      <div className="flex justify-center mb-6 space-x-6 ">
        <StatusCard title="Completed" count="0" />
        <StatusCard title="In Progress" count="0" />
        <StatusCard title="Pending" count="0" />
        <StatusCard title="Failed" count="0" />
      </div>
      <div className="bg-neutral-900 rounded-3xl  overflow-hidden flex-grow flex flex-col">
        <table className="w-full h-full">
          <thead>
            <tr className="bg-neutral-800">
              <th className="px-6 py-6  text-left text-lg font-medium text-neutral-400">
                Name
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-neutral-400">
                Task type
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-neutral-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-neutral-400">
                Images
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-neutral-400">
                Date created
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-neutral-400">
                Project
              </th>
            </tr>
          </thead>
          <tbody className="h-full">
            <tr className="h-full">
              <td
                colSpan="6"
                className="px-4 py-8 text-center text-md  text-neutral-400 align-middle"
              >
                No Data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusCard = ({ title, count }) => {
  return (
    <div className="bg-neutral-950 border border-neutral-400 font-semibold px-4 py-2 rounded-md flex items-center space-x-2 w-40">
      <span className="text-neutral-300 text-lg font-bold">{count}</span>
      <span className="text-neutral-400 text-md">{title}</span>
    </div>
  );
};

export default Dashboard;*/

import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 p-4 lg:p-8 flex flex-col h-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatusCard title="Completed" count="0" />
        <StatusCard title="In Progress" count="0" />
        <StatusCard title="Pending" count="0" />
        <StatusCard title="Failed" count="0" />
      </div>
      <div className="bg-neutral-900 rounded-3xl overflow-hidden flex-grow flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800">
                <th className="px-4 py-3 text-left text-sm sm:text-base lg:text-lg font-medium text-neutral-400">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm sm:text-base lg:text-lg font-medium text-neutral-400">
                  Task type
                </th>
                <th className="px-4 py-3 text-left text-sm sm:text-base lg:text-lg font-medium text-neutral-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm sm:text-base lg:text-lg font-medium text-neutral-400">
                  Images
                </th>
                <th className="px-4 py-3 text-left text-sm sm:text-base lg:text-lg font-medium text-neutral-400">
                  Date created
                </th>
                <th className="px-4 py-3 text-left text-sm sm:text-base lg:text-lg font-medium text-neutral-400">
                  Project
                </th>
              </tr>
            </thead>
            <tbody className="h-full">
              <tr className="h-full">
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-sm sm:text-base text-neutral-400 align-middle"
                >
                  No Data found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ title, count }) => {
  return (
    <div className="bg-neutral-950 border border-neutral-400 font-semibold px-3 py-2 rounded-md flex flex-col items-center justify-center w-full">
      <span className="text-neutral-300 text-xl sm:text-2xl font-bold">
        {count}
      </span>
      <span className="text-neutral-400 text-sm sm:text-base">{title}</span>
    </div>
  );
};

export default Dashboard;
