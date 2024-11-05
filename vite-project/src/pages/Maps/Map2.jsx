// import React from 'react';
// import { Map, Star, FolderClosed, Image, HelpCircle, Settings } from 'lucide-react';
// import Navbar from '../../components/ServicesNavbar';

// const MapInterface = () => {
//   return (
//     <div className="flex flex-col h-screen bg-black">
//       {/* Top Navigation Bar */}
//       {/* <nav className="flex items-center justify-between px-4 py-2 bg-black border-b border-gray-800">
//         <div className="flex items-center space-x-2">
//           <div className="text-red-500 font-bold flex items-center">
//             <Star className="w-5 h-5 mr-1" />
//             Star Mapper
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-8">
//           <NavItem icon={<Settings />} label="Services" />
//           <NavItem icon={<Star />} label="Star Map" />
//           <NavItem icon={<FolderClosed />} label="Plan" />
//           <NavItem icon={<Map />} label="Map" />
//           <NavItem icon={<Image />} label="Images" />
//           <NavItem icon={<HelpCircle />} label="Help" />
//         </div>
        
//         <div className="w-8 h-8 rounded-full bg-gray-700" />
//       </nav> */}
//       <Navbar />

//       {/* Main Content Area */}
//       <div className="flex-1 relative">
//         {/* Left Toolbar */}
//         <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-lg p-2">
//           <ToolbarButton icon={<span>←</span>} />
//           <ToolbarButton icon="+" />
//           <ToolbarButton icon="-" />
//           <ToolbarButton icon="★" />
//           <ToolbarButton icon="◎" />
//           <ToolbarButton icon="□" />
//           <ToolbarButton icon="↓" />
//         </div>

//         {/* Map View */}
//         <div className="w-full h-full bg-gray-900">
//           {/* Sample Map Content */}
//           <div className="p-4 text-gray-400">
//             Map_Sample
//           </div>
//         </div>

//         {/* Bottom Status Bar */}
//         <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded px-2 py-1">
//           <span className="text-white text-sm">Modes</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Components
// const NavItem = ({ icon, label }) => (
//   <div className="flex flex-col items-center text-gray-400 hover:text-white cursor-pointer">
//     <div className="w-6 h-6">
//       {icon}
//     </div>
//     <span className="text-xs mt-1">{label}</span>
//   </div>
// );

// const ToolbarButton = ({ icon }) => (
//   <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-gray-700 rounded mb-2">
//     {icon}
//   </button>
// );

// export default MapInterface;

import React from 'react';
import { Map, Star, FolderClosed, Image, HelpCircle, Settings } from 'lucide-react';
import Navbar from '../../components/ServicesNavbar';
import GoogleMap from '../StarMarg/CreateProject/Map'; // Ensure this imports your map component correctly

const MapInterface = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 relative">
        

        {/* Map View */}
        <div className="w-full h-full bg-gray-900">
          {/* Insert the GoogleMap component in place of the sample content */}
          <GoogleMap />
        </div>
        {/* Left Toolbar */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-lg p-2">
          <ToolbarButton icon={<span>←</span>} />
          <ToolbarButton icon="+" />
          <ToolbarButton icon="-" />
          <ToolbarButton icon="★" />
          <ToolbarButton icon="◎" />
          <ToolbarButton icon="□" />
          <ToolbarButton icon="↓" />
        </div>
        {/* Bottom Status Bar */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded px-2 py-1">
          <span className="text-white text-sm">Modes</span>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label }) => (
  <div className="flex flex-col items-center text-gray-400 hover:text-white cursor-pointer">
    <div className="w-6 h-6">
      {icon}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </div>
);

const ToolbarButton = ({ icon }) => (
  <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-gray-700 rounded mb-2">
    {icon}
  </button>
);

export default MapInterface;
