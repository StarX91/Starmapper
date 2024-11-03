import React from 'react';
import { Settings, Map, FolderClosed, Image, HelpCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/ServicesNavbar';

const StarMapperNav = () => {
  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      {/* Top Navigation Bar */}
     <Navbar />

      {/* Sub Header */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center">
          <button className="flex items-center text-gray-400 hover:text-white">
            <ChevronLeft size={20} />
            <span className="ml-2">StarMarg_Sample</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">Maps (1)</h2>
          <Link to='/sm/map2'>
        
          <button className="px-3 py-1 text-sm  border-gray-400 text-gray-400 hover:text-white">
            View on Map
          </button>
          </Link>
        </div>

        {/* Map Item */}
        <div className="w-32">
          <div className="bg-gray-800 aspect-square rounded-lg mb-2"></div>
          <div className="text-sm">Map_Sample</div>
          <div className="text-xs text-gray-500">2.89 GB</div>
          <div className="text-xs text-gray-500">Aug 23 24</div>
        </div>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex flex-col items-center cursor-pointer ${active ? 'text-white' : 'text-gray-500'} hover:text-white`}>
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </div>
);

export default StarMapperNav;