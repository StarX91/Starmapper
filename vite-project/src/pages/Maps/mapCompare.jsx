import React, { useState } from 'react';
import { Map, Settings, Folder, Image, HelpCircle, Menu, X, Compass } from 'lucide-react';
import Navbar from '../../components/ServicesNavbar';

const MapInterface = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative h-[calc(100vh-64px)]">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-black bg-opacity-70 px-3 py-1 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Map_Sample</span>
        </div>

        {/* Dataset Info Boxes */}
        <div className="absolute top-4 left-1/4 z-10 bg-black bg-opacity-70 p-2 rounded">
          <div className="text-sm">Dataset_1</div>
          <div className="text-xs text-gray-400">10/04/24, 10:23Pm</div>
          <div className="text-xs text-gray-400">Ortho</div>
        </div>

        <div className="absolute top-4 right-1/4 z-10 bg-black bg-opacity-70 p-2 rounded">
          <div className="text-sm">Dataset_1</div>
          <div className="text-xs text-gray-400">10/04/24, 10:23Pm</div>
          <div className="text-xs text-gray-400">Ortho</div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-200">
            {/* Placeholder for actual map/imagery */}
            <div className="w-full h-full bg-gray-300" />
          </div>

          {/* Vertical Slider */}
          <div className="absolute inset-0 z-10">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute top-1/2 left-0 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent"
              style={{
                '--slider-position': `${sliderPosition}%`,
              }}
            />
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
              style={{
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full left-1/2 -translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInterface;