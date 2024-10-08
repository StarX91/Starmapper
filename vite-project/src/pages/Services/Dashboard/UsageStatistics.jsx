import React from 'react';
import { Calendar, Group, Plus, Settings , MoveLeftIcon} from 'lucide-react';
import Navbar from '../../../components/ServicesNavbar';

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-sm font-semibold text-white mt-1">{title}</p>
    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const UsageStatsDashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="p-4 mt-4">
        <div className="flex items-center justify-between mb-4">
        
          <h2 className="text-xl"><span className='mr-4 mt-2'> <button><MoveLeftIcon /></button></span>Usage Statistics</h2>
          <div className="flex space-x-4">
            <select className="bg-gray-800 rounded px-2 py-1">
              <option>This Week</option>
            </select>
            <div className="flex items-center bg-gray-800 rounded px-2 py-1">
              <button className="mr-2">&lt;</button>
              <span>28th Sep 2024</span>
              <button className="ml-2">&gt;</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Storage" value="12GB" subtitle="Total storage consumed on platform" />
          <StatCard title="Images" value="0" subtitle="Image processed in current month" />
          <StatCard title="Projects" value="0" subtitle="Projects created in given time interval" />
          <StatCard title="Collections" value="0" subtitle="Collections created in given time interval" />
          <StatCard title="Objects" value="0" subtitle="Objects detected in given time interval" />
          <StatCard title="Megapixels Processed" value="0" subtitle="Total image data processed in Megapixels" />
          <StatCard title="Maps" value="0" subtitle="No. of Maps generated on given time interval" />
        </div>
      </main>
    </div>
  );
};

export default UsageStatsDashboard;