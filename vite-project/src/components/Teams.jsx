import React from 'react';
import { ChevronLeft, Plus, Settings } from 'lucide-react';
import Navbar from './ServicesNavbar'

const TeamMembersList = () => {
  const members = [
    { name: 'test@gmail.com', date: '23 Sep 2023', status: 'Invited' }
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
 <Navbar />
      
      <main className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-6">
          <ChevronLeft className="mr-2" />
          <h1 className="text-xl font-semibold">Teams</h1>
        </div>
        
        <div className="bg-[#1c1c1c] rounded-lg p-4 flex-grow border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-400">Total Members ({members.length})</h2>
            <button className="bg-white text-black px-3 py-1 rounded text-sm">Invite</button>
          </div>
          
          {members.map((member, index) => (
            <div key={index} className="bg-[#2c2c2c] rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div>
                  <p className="text-sm">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.date}</p>
                </div>
              </div>
              <span className="text-xs text-red-500">{member.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeamMembersList;