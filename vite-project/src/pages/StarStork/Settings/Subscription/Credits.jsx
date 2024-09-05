import React from "react";

const Credits = () => {
  return (
    <div>
      <h2 className="text-center text-neutral-500 font-bold my-28  mb-4 text-xl">
        Credits
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left  rounded-xl  overflow-hidden border-collapse">
          <thead>
            <tr className="bg-neutral-900  rounded-xl  overflow-visible ">
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Service</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm  ">Analytics</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Processing</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm  ">Storage</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">
                Total Drones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" rounded-lg  border-solid border-2 border-neutral-900 text-neutral-400 text-sm font-semibold">
              <td className="p-2 ">Picstork</td>
              <td className="p-2 ">0.00/1.00</td>
              <td className="p-2 ">N/A</td>
              <td className="p-2 ">3.69/10.00</td>
              <td className="p-2 ">N/A</td>
            </tr>
            <tr className=" rounded-lg  border-solid border-2 border-neutral-900 text-neutral-400 text-sm font-semibold">
              <td className="p-2 ">Picstork</td>
              <td className="p-2 ">0.00/1.00</td>
              <td className="p-2 ">N/A</td>
              <td className="p-2 ">3.69/10.00</td>
              <td className="p-2 ">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Credits;