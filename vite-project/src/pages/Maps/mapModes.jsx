import React, { useState } from 'react';
import { Map, Image, Settings, HelpCircle, FileText, X } from 'lucide-react';
import Navbar from '../../components/ServicesNavbar';

const MapModes = () => {
  const [showModesPanel, setShowModesPanel] = useState(true);
  const [selectedMode, setSelectedMode] = useState('DSM');

  const modes = [
    {
      id: 'DSM',
      title: 'DSM',
      description: 'Analyze digital surface models for terrain analysis.'
    },
    {
      id: '3D_MODELS',
      title: '3D Models',
      description: 'Immersive 3D representation of the environment.'
    },
    {
      id: 'FLOORS',
      title: 'Floors',
      description: 'View and manage floor plans for indoor spaces.'
    }
  ];

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
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <ToolButton icon="+" />
          <ToolButton icon="-" />
          <ToolButton icon="☆" />
          <ToolButton icon="⚡" />
          <ToolButton icon="◎" />
          <ToolButton icon="⊕" />
          <ToolButton icon="🔍" />
          <ToolButton icon="⇩" />
        </div>

        {/* Modes Panel */}
        {showModesPanel && (
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-64 bg-black bg-opacity-75 rounded-lg text-white p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg">Modes</h3>
              <button 
                onClick={() => setShowModesPanel(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              {modes.map((mode) => (
                <ModeOption 
                  key={mode.id}
                  title={mode.title}
                  description={mode.description}
                  isSelected={selectedMode === mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                />
              ))}
            </div>
          </div>
        )}

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
          {selectedMode === 'DSM' ? 'DE Mode' : selectedMode.replace('_', ' ')}
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

const ModeOption = ({ title, description, isSelected, onClick }) => (
  <div 
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center space-x-2">
      <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-colors duration-200
        ${isSelected ? 'border-blue-500' : 'border-white group-hover:border-blue-300'}`}>
        {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
      </div>
      <span className={`font-medium ${isSelected ? 'text-blue-500' : 'text-white group-hover:text-blue-300'}`}>
        {title}
      </span>
    </div>
    <p className={`text-sm mt-1 ml-6 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
      {description}
    </p>
  </div>
);

export default MapModes;