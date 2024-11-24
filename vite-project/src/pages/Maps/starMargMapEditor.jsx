import React from 'react';
import { Map, Image, Settings, HelpCircle, FileText } from 'lucide-react';
import Navbar from '../../components/ServicesNavbar';

const MapInterface = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Top Navigation Bar */}
     <Navbar />

      {/* Main Content Area */}
      <div className="relative flex-1 bg-gray-900">
        {/* Back Button */}
        <button className="absolute top-4 left-4 px-3 py-1 bg-black bg-opacity-50 text-white rounded-md flex items-center">
          <span className="mr-1">←</span> Map_Sample
        </button>

        {/* Side Tools */}
        <div className="absolute  left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <ToolButton icon="+" />
          <ToolButton icon="-" />
          <ToolButton icon="◎" />
          <ToolButton icon="⊕" />
          <ToolButton icon="🔍" />
          <ToolButton icon="⇩" />
        </div>

        {/* Map Content */}
        <div className="h-full w-full bg-gray-800 overflow-hidden">
          <img 
            src="/api/placeholder/1200/800" 
            alt="Satellite Map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Map Mode Indicator */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-md">
          DE Mode
        </div>
      </div>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, className = "" }) => (
  <div className={`flex flex-col items-center text-gray-400 hover:text-white cursor-pointer ${className}`}>
    <div className="mb-0.5">{icon}</div>
    <span className="text-xs">{label}</span>
  </div>
);

const ToolButton = ({ icon }) => (
  <button className="w-8 h-8 bg-black bg-opacity-50 text-white rounded flex items-center justify-center hover:bg-opacity-70">
    {icon}
  </button>
);

export default MapInterface;