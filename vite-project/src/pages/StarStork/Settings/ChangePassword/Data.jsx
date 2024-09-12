import React from "react";

const Data = () => {
  return (
    <div className="flex flex-col items-center  justify-center mb-2">
      <h1 className="mt-24 text-center text-2xl text-neutral-500 font-bold">
        Set Password{" "}
      </h1>
      <span className="font-semibold text-center text-md text-neutral-600 mt-4">
        You have not signed up using email and password. Please set a password
        for your<br></br> account.
      </span>

      <div className="mb-4 mt-4">
        <h1 className="text-neutral-500 text-lg font-semibold text-center">
          New Password
        </h1>
        <input
          type="text"
          className="bg-neutral-900 mt-2 border border-neutral-500 rounded-md px-8"
        />
      </div>
      <div className="mb-4 mt-4">
        <h1 className="text-neutral-500 text-lg font-semibold text-center">
          Confirm Password
        </h1>
        <input
          type="text"
          className="bg-neutral-900 mt-2 border border-neutral-500 rounded-md px-8"
        />
      </div>
      <button className="mt-4 bg-neutral-400 text-neutral-900 font-semibold rounded-md hover:bg-neutral-900 text-center text-md px-8 p-1 hover:text-neutral-400 hover:border">
        Save
      </button>
    </div>
  );
};

export default Data;
