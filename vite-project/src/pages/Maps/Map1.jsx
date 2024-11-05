

// import React, { useState } from 'react';
// import { Map, ChevronLeft, ChevronRight, Maximize2, Scissors, Sun, Moon } from 'lucide-react';

// const DronePlanner = () => {
//   const [satelliteMode, setSatelliteMode] = useState(true);
//   const [darkMode, setDarkMode] = useState(true);
//   const [waypoints, setWaypoints] = useState([
//     { id: 1, lat: 20.123213, lon: 75.434323, alt: 5, speed: 5 },
//     { id: 2, lat: 20.123213, lon: 75.434323, alt: 5, speed: 5 },
//     { id: 3, lat: 20.123213, lon: 75.434323, alt: 5, speed: 5 },
//   ]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
//       {/* Left Panel - Now 40% width */}
//       <div className={`w-2/5 p-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-300'} overflow-auto`}>
//         <div className="flex justify-between mb-4">
//           <button 
//             className={`px-3 py-1 rounded flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
//             onClick={toggleDarkMode}
//           >
//             {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
//             {darkMode ? 'Light' : 'Dark'}
//           </button>
//           <div className="flex items-center">
//             <span className="mr-2">Satellite Mode</span>
//             <button 
//               className={`px-3 py-1 ${satelliteMode ? 'bg-blue-600 hover:bg-blue-700' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded transition-colors`}
//               onClick={() => setSatelliteMode(!satelliteMode)}
//             >
//               {satelliteMode ? 'On' : 'Off'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Latitude</div>
//             <div className="font-mono">20.123213</div>
//           </div>
//           <div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Longitude</div>
//             <div className="font-mono">75.434323</div>
//           </div>
//           <div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Altitude</div>
//             <div className="font-mono">1000 m</div>
//           </div>
//         </div>

//         <div className="mb-4">
//           <input 
//             type="text" 
//             placeholder="Search Location" 
//             className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 focus:bg-gray-700' : 'bg-white border border-gray-300'} outline-none focus:ring-2 focus:ring-blue-500`} 
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Select Flight Type</div>
//             <select className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`}>
//               <option>Way Points</option>
//             </select>
//           </div>
//           <div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Altitude</div>
//             <input 
//               type="text" 
//               value="1000m" 
//               className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
//             />
//           </div>
//           <div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Flight Speed</div>
//             <input 
//               type="text" 
//               value="1000 Kph" 
//               className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
//             />
//           </div>
//         </div>

//         <div className="flex mb-4">
//           <button className={`flex-1 px-3 py-2 rounded-l ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>Mission</button>
//           <button className={`flex-1 px-3 py-2 rounded-r ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>Fence</button>
//         </div>

//         <div className="mb-4">
//           <div className="flex items-center justify-between mb-2">
//             <div>Waypoints</div>
//             <div className="flex items-center">
//               <button className="hover:bg-gray-700 rounded p-1 transition-colors">
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <Map className="w-6 h-6 mx-2" />
//               <div className="font-mono">2 3 0</div>
//               <button className="hover:bg-gray-700 rounded p-1 transition-colors">
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Latitude</div>
//               <input 
//                 type="text" 
//                 value="20.123213" 
//                 className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
//               />
//             </div>
//             <div>
//               <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Longitude</div>
//               <input 
//                 type="text" 
//                 value="75.434323" 
//                 className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
//               />
//             </div>
//             <div>
//               <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Altitude (in meters)</div>
//               <input 
//                 type="text" 
//                 value="5" 
//                 className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
//               />
//             </div>
//             <div>
//               <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Flight Speed</div>
//               <input 
//                 type="text" 
//                 value="5 Km/Hr" 
//                 className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
//               />
//             </div>
//           </div>
//         </div>

//         <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Save</button>
//       </div>

//       {/* Right Panel - Now 60% width */}
//       <div className="w-3/5 relative">
//         <img src="/api/placeholder/800/600" alt="Map" className="w-full h-full object-cover" />
//         <div className="absolute top-4 right-4 flex space-x-2">
//           <button className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-colors`}>
//             <Maximize2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
//           </button>
//           <button className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-colors`}>
//             <Scissors className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
//           </button>
//         </div>
//         {/* Green rectangle overlay */}
//         <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-green-500">
//           <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//           <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
//           <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
//           <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DronePlanner;

import React, { useState } from 'react';
import { Map, ChevronLeft, ChevronRight, Maximize2, Scissors, Sun, Moon } from 'lucide-react';

const DronePlanner = () => {
  const [satelliteMode, setSatelliteMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [waypoints, setWaypoints] = useState([
    { id: 1, lat: 20.123213, lon: 75.434323, alt: 5, speed: 5 },
    { id: 2, lat: 20.123213, lon: 75.434323, alt: 5, speed: 5 },
    { id: 3, lat: 20.123213, lon: 75.434323, alt: 5, speed: 5 },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-black text-gray-400' : 'bg-gray-100 text-black'}`}>
      {/* Left Panel - Now 40% width */}
      <div className={`w-2/5 p-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-300'} overflow-auto`}>
        <div className="flex justify-between mb-4">
          <button 
            className={`px-3 py-1 rounded flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <div className="flex items-center">
            <span className="mr-2">Satellite Mode</span>
            <button 
              className={`px-3 py-1 ${satelliteMode ? 'bg-blue-600 hover:bg-blue-700' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded transition-colors`}
              onClick={() => setSatelliteMode(!satelliteMode)}
            >
              {satelliteMode ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Latitude</div>
            <div className="font-mono">20.123213</div>
          </div>
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Longitude</div>
            <div className="font-mono">75.434323</div>
          </div>
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Altitude</div>
            <div className="font-mono">1000 m</div>
          </div>
        </div>

        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search Location" 
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 focus:bg-gray-700' : 'bg-white border border-gray-300'} outline-none focus:ring-2 focus:ring-blue-500`} 
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Select Flight Type</div>
            <select className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`}>
              <option>Way Points</option>
            </select>
          </div>
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Altitude</div>
            <input 
              type="text" 
              value="1000m" 
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
            />
          </div>
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Flight Speed</div>
            <input 
              type="text" 
              value="1000 Kph" 
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
            />
          </div>
        </div>

        <div className="flex mb-4">
          <button className={`flex-1 px-3 py-2 rounded-l ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>Mission</button>
          <button className={`flex-1 px-3 py-2 rounded-r ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>Fence</button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>Waypoints</div>
            <div className="flex items-center">
              <button className="hover:bg-gray-700 rounded p-1 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <Map className="w-6 h-6 mx-2" />
              <div className="font-mono">2 3 0</div>
              <button className="hover:bg-gray-700 rounded p-1 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Latitude</div>
              <input 
                type="text" 
                value="20.123213" 
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
              />
            </div>
            <div>
              <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Longitude</div>
              <input 
                type="text" 
                value="75.434323" 
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
              />
            </div>
            <div>
              <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Altitude (in meters)</div>
              <input 
                type="text" 
                value="5" 
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
              />
            </div>
            <div>
              <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>Flight Speed</div>
              <input 
                type="text" 
                value="5 Km/Hr" 
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`} 
              />
            </div>
          </div>
        </div>

        <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Save</button>
      </div>

      {/* Right Panel - Now 60% width */}
      <div className="w-3/5 relative">
        <img src="/api/placeholder/800/600" alt="Map" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-colors`}>
            <Maximize2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
          </button>
          <button className={`p-2 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-colors`}>
            <Scissors className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
          </button>
        </div>
        {/* Green rectangle overlay */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-green-500">
          <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default DronePlanner;