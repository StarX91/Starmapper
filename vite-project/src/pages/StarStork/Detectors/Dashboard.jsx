/*import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className="flex-1 h-full p-4 bg-black">

      <div className="flex justify-end mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-neutral-800 py-2 pl-4 pr-10 rounded-md text-white w-64"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <BiSearchAlt className="text-neutral-500 hover:text-neutral-400 w-5 h-5" />
          </button>
        </div>
      </div>


      <div className="bg-neutral-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-800">
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Objects
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Accuracy
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Images
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Date created
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="7"
                className="px-6 py-40 text-center text-sm text-neutral-500 bg-neutral-900"
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

export default Dashboard; */
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className="flex-1 h-full p-4 bg-black">
      {/* Search */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-neutral-800 py-2 pl-4 pr-10 rounded-md text-white w-64"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <BiSearchAlt className="text-neutral-500 hover:text-neutral-400 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-neutral-900 rounded-xl overflow-hidden"
        style={{ minHeight: "75vh" }}
      >
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-neutral-800">
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Objects
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Accuracy
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Images
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Date created
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-400 truncate">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="7"
                className="px-6 py-40 text-center text-sm text-neutral-500 bg-neutral-900"
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

export default Dashboard;
