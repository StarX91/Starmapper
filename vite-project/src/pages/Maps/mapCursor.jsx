import React, { useState } from 'react';
import { 
  Map,
  Compass,
  Settings,
  Star,
  HelpCircle,
  Image,
  ChevronLeft,
  Plus,
  Star as StarIcon,
  Pencil,
  MapPin,
  Hexagon,
  Square,
  Download,
  Layers,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import Navbar from '../../components/ServicesNavbar';

const MapCursor = () => {
  // State management
  const [selectedTool, setSelectedTool] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [polygons, setPolygons] = useState([{ id: 1, name: 'Polygon 1', active: true }]);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState('satellite');
  const [showTooltip, setShowTooltip] = useState('');

  // Tool definitions with tooltips
  const tools = [
    { icon: Plus, name: 'Zoom', action: () => setSelectedTool('zoom') },
    { icon: StarIcon, name: 'Favorite', action: () => setSelectedTool('favorite') },
    { icon: Pencil, name: 'Draw', action: () => setSelectedTool('draw') },
    { icon: MapPin, name: 'Place Marker', action: () => setSelectedTool('marker') },
    { icon: Hexagon, name: 'Measure Area', action: () => setSelectedTool('area') },
    { icon: Square, name: 'Select', action: () => setSelectedTool('select') },
    { icon: Download, name: 'Download', action: () => handleDownload() }
  ];

  // Handlers
  const handleDownload = () => {
    // Simulate download action
    console.log('Downloading map data...');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToolClick = (toolName) => {
    setSelectedTool(toolName);
    setIsDrawing(toolName === 'draw');
  };

  const handleModeChange = () => {
    setCurrentMode(currentMode === 'satellite' ? 'terrain' : 'satellite');
  };

  const addNewPolygon = () => {
    const newPolygon = {
      id: polygons.length + 1,
      name: `Polygon ${polygons.length + 1}`,
      active: false
    };
    setPolygons([...polygons, newPolygon]);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 p-4 transition-all duration-300`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-gray-400" onClick={() => window.history.back()} />
              {!isSidebarCollapsed && <span>Map_Sample</span>}
            </div>
            {isSidebarCollapsed ? (
              <Maximize2 className="w-4 h-4 cursor-pointer hover:text-gray-400" onClick={toggleSidebar} />
            ) : (
              <Minimize2 className="w-4 h-4 cursor-pointer hover:text-gray-400" onClick={toggleSidebar} />
            )}
          </div>
          
          {!isSidebarCollapsed && (
            <div className="space-y-4">
              <div className="text-sm text-gray-400 flex justify-between items-center">
                <span>All Measurements</span>
                <Plus 
                  className="w-4 h-4 cursor-pointer hover:text-white" 
                  onClick={addNewPolygon}
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Polygon</div>
                {polygons.map(polygon => (
                  <div 
                    key={polygon.id}
                    className={`flex items-center space-x-2 ${polygon.active ? 'text-red-500' : 'text-gray-400'} 
                              cursor-pointer hover:bg-gray-800 p-1 rounded`}
                    onClick={() => setPolygons(polygons.map(p => ({ ...p, active: p.id === polygon.id })))}
                  >
                    <div className={`w-2 h-2 ${polygon.active ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm">{polygon.name}</span>
                    {polygon.active && (
                      <X 
                        className="w-3 h-3 ml-auto hover:text-red-400" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPolygons(polygons.filter(p => p.id !== polygon.id));
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-sm cursor-pointer hover:text-gray-300">Lines</div>
              <div className="text-sm cursor-pointer hover:text-gray-300">Markers</div>
            </div>
          )}
        </div>

        {/* Main Map Area */}
        <div 
          className="flex-1 relative bg-gray-800"
          style={{ cursor: isDrawing ? 'crosshair' : 'default' }}
        >
          {/* Tools Sidebar */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 rounded-lg p-2">
            <div className="space-y-4">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="relative"
                  onMouseEnter={() => setShowTooltip(tool.name)}
                  onMouseLeave={() => setShowTooltip('')}
                >
                  <tool.icon
                    className={`w-5 h-5 cursor-pointer transition-colors duration-200
                      ${selectedTool === tool.name ? 'text-blue-400' : 'text-gray-400'}
                      hover:text-white`}
                    onClick={tool.action}
                  />
                  {showTooltip === tool.name && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap">
                      {tool.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mode Toggle */}
          <div 
            className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black bg-opacity-80 
                       rounded-lg px-3 py-2 cursor-pointer hover:bg-opacity-90"
            onClick={handleModeChange}
          >
            <Layers className="w-5 h-5" />
            <span className="text-sm capitalize">{currentMode} Mode</span>
          </div>

          {/* Drawing Status */}
          {isDrawing && (
            <div className="absolute top-4 right-4 bg-blue-500 px-3 py-1 rounded-full text-sm">
              Drawing Mode Active
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapCursor;