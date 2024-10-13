import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaRegCreditCard, FaShieldAlt, FaKey } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleStat = () => {
    navigate('/services/settings/Stat');
  };

  const buttonClass = "flex items-center space-x-4 px-4 py-2 w-full text-neutral-500 rounded-md font-semibold text-sm lg:text-md";
  const iconClass = "w-5 h-5";

  return (
    <div className="bg-neutral-900 text-white w-full rounded-xl h-full px-4 py-5 lg:py-8">
      <div className="flex flex-col space-y-4 lg:space-y-8">
        <Link to="/services/settings/profile" className="w-full">
          <button className={`${buttonClass} bg-neutral-800`}>
            <FaUser className={iconClass} />
            <span>Profile</span>
          </button>
        </Link>
        <Link to="/services/settings/subscription" className="w-full">
          <button className={`${buttonClass} border-2 border-solid border-neutral-700`}>
            <FaRegCreditCard className={iconClass} />
            <span>Subscriptions</span>
          </button>
        </Link>
        <Link to="/services/settings/invoices" className="w-full">
          <button className={`${buttonClass} border-2 border-solid border-neutral-700`}>
            <FaRegCreditCard className={iconClass} />
            <span>Invoices</span>
          </button>
        </Link>
        {/* <button className={`${buttonClass} border-2 border-solid border-neutral-700`}>
          <FaShieldAlt className={iconClass} />
          <span>Security</span>
        </button> */}
        <Link to="/services/settings/ApiKeys" className="w-full">
          <button className={`${buttonClass} border-2 border-solid border-neutral-700`}>
            <FaKey className={iconClass} />
            <span>API keys</span>
          </button>
        </Link>
        <button className={`${buttonClass} border-2 border-solid border-neutral-700`} onClick={handleStat}>
          <IoStatsChart className={iconClass} />
          <span>Usage Statistics</span>
        </button>
        <Link to="/services/settings/Security" className="w-full">
          <button className={`${buttonClass} border-2 border-solid border-neutral-700`}>
            <FaShieldAlt className={iconClass} />
            <span>Security</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
