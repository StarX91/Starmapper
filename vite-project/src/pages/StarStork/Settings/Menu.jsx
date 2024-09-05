import React from "react";
import { FaUser, FaRegCreditCard, FaShieldAlt, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="bg-neutral-900 text-white w-full rounded-xl h-fit px-4 py-5">
      <div className="flex flex-col space-y-8">
        <Link to='/ss/settings'>
          <button className="flex w-full items-center space-x-4 px-5 py-2 bg-neutral-800 text-neutral-500  rounded-md font-semibold">
            <FaUser />
            <span className="text-neutral-500 font-semibold text-xs">Profile</span>
          </button>
        </Link>
        <Link to='/ss/settings/subscriptions'>
          <button className="flex w-full items-center space-x-4 px-3 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
            <FaRegCreditCard />
            <span className="text-neutral-500 font-semibold text-xs">Subscriptions</span>
          </button>
        </Link>
        <Link to='/ss/settings/invoices'>
        <button className="flex w-full items-center space-x-4 px-5 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
          <FaRegCreditCard />
          <span className="text-neutral-500 font-semibold text-xs ">Invoices</span>
        </button>
        </Link>
        <button className="flex w-full items-center  gap-3 px-1 py-2 border-2 border-solid border-neutral-700 text-neutral-500  rounded-md font-semibold">
          <FaKey className="ml-0" />
          <span className="text-neutral-500 font-semibold text-xs ">Change Password</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
