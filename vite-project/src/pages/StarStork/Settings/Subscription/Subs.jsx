import React from "react";

const Subs = () => {
  return (
    <div>
      {" "}
      <h2 className="text-center text-neutral-500 font-bold mb-4 text-xl">
        Subscription Plans
      </h2>
      <div className=" ">
        <table className="w-full text-left  rounded-xl  overflow-hidden border-collapse ">
          <thead className="   ">
            <tr className="bg-neutral-900  rounded-xl  overflow-visible ">
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm">Your Plan</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm">Billing</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm">Service</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm">Status</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm">Expires on</th>
              <th className="p-2 py-4 text-neutral-500 font-bold text-sm">Buy</th>
            </tr>
          </thead>
          <tbody className="overflow-hidden ">
            {/* <div className=""> */}
            <tr className=" rounded-lg  border-solid border-2 border-neutral-900 text-neutral-400 text-sm font-semibold">
              <td className="p-2 ">Picstork Trial</td>
              <td className="p-2 ">Trial</td>
              <td className="p-2 ">Picstork</td>
              <td className="p-2  text-green-700">Active</td>
              <td className="p-2 ">10/12/2024</td>
              <td className="p-2  ">Buy</td>
            </tr>
            {/* </div> */}
            <tr className="overflow-hidden rounded-xl border-solid border-2 border-neutral-900 text-neutral-400 text-sm font-semibold">
              <td className="p-2 ">Picstork Trial</td>
              <td className="p-2 ">Trial</td>
              <td className="p-2 ">Picstork</td>
              <td className="p-2  text-green-500">
                Active
              </td>
              <td className="p-2 ">10/12/2024</td>
              <td className="p-2 ">Buy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subs;