/* import React from "react";
import { FaUser, FaRegCreditCard, FaShieldAlt, FaKey } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="bg-neutral-900 text-white w-full rounded-xl h-full px-4 py-5">
      <div className="flex flex-col space-y-8">
        <button className="flex items-center space-x-4 px-5 py-2 bg-neutral-800 text-neutral-500  rounded-md font-semibold">
          <FaUser />
          <span className="text-neutral-500 font-semibold text-sm">Profile</span>
        </button>
        <button className="flex items-center space-x-4 px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
          <FaRegCreditCard />
          <span className="text-neutral-500 font-semibold text-sm">Subscriptions</span>
        </button>
        <button className="flex items-center space-x-4 px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
          <FaRegCreditCard />
          <span className="text-neutral-500 font-semibold text-sm ">Invoices</span>
        </button>
        <button className="flex items-center space-x-4 px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
          <FaShieldAlt />
          <span className="text-neutral-500 font-semibold text-sm ">Security</span>
        </button>
        <button className="flex items-center space-x-4 px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
          <FaKey />
          <span className="text-neutral-500 font-semibold text-sm ">API keys</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;*/

import React from "react";
import { FaUser, FaRegCreditCard, FaShieldAlt, FaKey } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="bg-neutral-900 text-white w-full rounded-xl h-full px-4 py-5 lg:py-8">
      <div className="flex flex-col space-y-4 lg:space-y-8">
        <button className="flex items-center space-x-4 px-4 lg:px-5 py-2 bg-neutral-800 text-neutral-500 rounded-md font-semibold">
          <FaUser />
          <span className="text-neutral-500 font-semibold text-sm lg:text-md">
            Profile
          </span>
        </button>
        <button className="flex items-center space-x-4 px-4 lg:px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500 rounded-md font-semibold">
          <FaRegCreditCard />
          <span className="text-neutral-500 font-semibold text-sm lg:text-md">
            Subscriptions
          </span>
        </button>
        <button className="flex items-center space-x-4 px-4 lg:px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500 rounded-md font-semibold">
          <FaRegCreditCard />
          <span className="text-neutral-500 font-semibold text-sm lg:text-md">
            Invoices
          </span>
        </button>
        <button className="flex items-center space-x-4 px-4 lg:px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500 rounded-md font-semibold">
          <FaShieldAlt />
          <span className="text-neutral-500 font-semibold text-sm lg:text-md">
            Security
          </span>
        </button>
        <button className="flex items-center space-x-4 px-4 lg:px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500 rounded-md font-semibold">
          <FaKey />
          <span className="text-neutral-500 font-semibold text-sm lg:text-md">
            API keys
          </span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
