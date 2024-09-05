import React from "react";

const ServicesPlans = () => {
  return (
    <div className="text-white bg-neutral-950 w-full h-full p-4  shadow-lg mb-8 py-32">
      <h2 className="text-center mb-4 text-xl text-neutral-600 font-bold">
        Services Plans
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left  rounded-xl  overflow-hidden border-collapse ">
          <thead>
            <tr className="bg-neutral-900  rounded-xl  overflow-visible">
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Invoice Number</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Product</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Amount</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Status</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-solid border-2 border-neutral-900">
              <td className="p-2 font-semibold text-center text-sm  text-neutral-500" colSpan="5">
                No Data found
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-center mb-4 text-xl my-10 text-neutral-600 font-bold">
          Task Credits
        </h2>
        <table className="w-full text-left  rounded-xl  overflow-hidden border-collapse ">
          <thead>
            <tr className="bg-neutral-900  rounded-xl  overflow-visible">
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Invoice Number</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Product</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Amount</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Status</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm ">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-solid border-2 border-neutral-900">
              <td className="p-2 font-semibold text-center text-sm  text-neutral-500" colSpan="5">
                No Data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesPlans;