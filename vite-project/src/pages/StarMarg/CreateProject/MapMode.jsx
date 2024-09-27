import React, { useState } from 'react';
import { Calendar, FolderOpen, HelpCircle, Settings, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbartwo from '../Navbar/Navbartwo';
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

const MapMode = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const renderCalendar = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-1"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        i === today.getDate() && 
        currentDate.getMonth() === today.getMonth() && 
        currentDate.getFullYear() === today.getFullYear();

      const isSelected = 
        i === selectedDate.getDate() && 
        currentDate.getMonth() === selectedDate.getMonth() && 
        currentDate.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div 
          key={i} 
          onClick={() => selectDate(i)}
          className={`text-center p-1 cursor-pointer ${
            isToday ? 'bg-red-600 rounded-full' : 
            isSelected ? 'bg-blue-600 rounded-full' : 
            'hover:bg-gray-700 rounded-full'
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <Navbartwo />
      <div className="flex items-center mt-4 mb-4">
        <button className="mr-2">&lt;</button>
        <h2>Plan_Name</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black border border-gray-500 rounded-lg p-4">
          <div className="flex justify-between items-center bg-gray-950 mb-2">
            <h3>Tasks (0)</h3>
            <button className="bg-gray-950 px-2 py-1 rounded">Add +</button>
          </div>
          <p className="text-gray-500">No tasks available</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-500 ">
          <div className="flex justify-between items-center mb-2">
            <div className="text-4xl font-bold">{selectedDate.getDate().toString().padStart(2, '0')}</div>
            <div>
              <div className="text-right">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <div className="text-gray-500">Tasks/Plans:</div>
              <div className="text-gray-500">No tasks available</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <button onClick={prevMonth}><ChevronLeft /></button>
            <button onClick={nextMonth}><ChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            <div className="text-center">S</div>
            <div className="text-center">M</div>
            <div className="text-center">T</div>
            <div className="text-center">W</div>
            <div className="text-center">T</div>
            <div className="text-center">F</div>
            <div className="text-center">S</div>
            {renderCalendar()}
          </div>
        </div>
      </div>

      <div className="bg-black border border-gray-500 rounded-3xl mt-4 p-6 min-h-[450px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-500 text-xl">Plans</h2>

            {/* Search and Button Section */}
            <div className="flex space-x-6">
             
              <button
                
                className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800"
              >
                New Plan +
              </button>
              <button
               // Open Import Popup on button click
                className="p-1 px-6 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-800"
              >
                <IoMdMenu />
              </button>
            </div>
           
          </div>
          <div className="bg-neutral-800 w-full min-h-[350px] mt-6 rounded-3xl"></div>
          {/* Add further image-related content here */}
        </div>
    </div>
  );
};

export default MapMode;
