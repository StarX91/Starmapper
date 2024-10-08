import React from 'react';
import { Settings, LayoutGrid, Calendar, Users, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import Navbar from '../../../components/ServicesNavbar';

const Header = () => (
  <header className=" bg-black">
    <Navbar />
  </header>
);

const StorageCard = ({ title, value }) => (
  <div className="bg-gray-800 p-2 rounded">
    <div className="text-gray-400 text-xs">{title}</div>
    <div className="text-white text-sm font-semibold">{value}</div>
  </div>
);

const Dashboard2 = () => {
  const requestData = [
    { name: 'Completed', value: 75, color: '#8B0000' },
    { name: 'In Progress', value: 25, color: '#DAA520' },
  ];

  const processingData = [
    { name: 'Pending', value: 0 },
    { name: 'In-Progress', value: 0 },
    { name: 'Completed', value: 100 },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <main className="p-4">
        <div className="mb-4">
          <select className="bg-gray-800 text-white p-2 rounded">
            <option>Sample_Rooftop</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Request Status</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={requestData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {requestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Data Processing and Analysis</h3>
            <BarChart width={200} height={200} data={processingData}>
              <XAxis dataKey="name" tick={{ fill: 'white' }} />
              <YAxis tick={{ fill: 'white' }} />
              <Bar dataKey="value" fill="#8B0000" />
            </BarChart>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Storage</h3>
            <div className="grid grid-cols-2 gap-2">
              <StorageCard title="Total Storage" value="587.8 MB" />
              <StorageCard title="Images" value="587.8 MB" />
              <StorageCard title="Videos" value="0 bytes" />
              <StorageCard title="Others" value="0 bytes" />
              <StorageCard title="Maps" value="0 bytes" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Recent Notification</h3>
            <div className="text-center text-gray-600 py-8">No tasks Available</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-gray-400 mb-2">Recent Tasks</h3>
            <div className="text-center text-gray-600 py-8">No tasks Available</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard2;