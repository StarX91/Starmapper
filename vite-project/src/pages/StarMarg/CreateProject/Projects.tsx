// import React, { useState } from 'react';
// import { Calendar, FolderOpen, HelpCircle, Settings, Star, ChevronLeft, ChevronRight } from 'lucide-react';
// import Navbartwo from '../Navbar/Navbartwo';

// const Projects: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date());
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
//   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

//   const prevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const selectDate = (day: number) => {
//     setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
//   };

//   const renderCalendar = (): JSX.Element[] => {
//     const days: JSX.Element[] = [];
//     const today = new Date();

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="text-center p-1"></div>);
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       const isToday = 
//         i === today.getDate() && 
//         currentDate.getMonth() === today.getMonth() && 
//         currentDate.getFullYear() === today.getFullYear();

//       const isSelected = 
//         i === selectedDate.getDate() && 
//         currentDate.getMonth() === selectedDate.getMonth() && 
//         currentDate.getFullYear() === selectedDate.getFullYear();

//       days.push(
//         <div 
//           key={i} 
//           onClick={() => selectDate(i)}
//           className={`text-center p-1 cursor-pointer ${
//             isToday ? 'bg-red-600 rounded-full' : 
//             isSelected ? 'bg-blue-600 rounded-full' : 
//             'hover:bg-gray-700 rounded-full'
//           }`}
//         >
//           {i}
//         </div>
//       );
//     }
//     return days;
//   };

//   return (
//     <div className="bg-black text-white min-h-screen p-4">
     
// <Navbartwo  />
//       <div className="flex items-center mt-4 mb-4">
//         <button className="mr-2">&lt;</button>
//         <h2>Plan_Name</h2>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-black border border-gray-500 rounded-lg p-4">
//           <div className="flex justify-between items-center bg-gray-950 mb-2">
//             <h3>Tasks (0)</h3>
//             <button className="bg-gray-950 px-2 py-1 rounded">Add +</button>
//           </div>
//           <p className="text-gray-500">No tasks available</p>
//         </div>

//         <div className="bg-black rounded-lg p-4 border border-gray-500 ">
//           <div className="flex justify-between items-center mb-2">
//             <div className="text-4xl font-bold">{selectedDate.getDate().toString().padStart(2, '0')}</div>
//             <div>
//               <div className="text-right">
//                 {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
//               </div>
//               <div className="text-gray-500">Tasks/Plans:</div>
//               <div className="text-gray-500">No tasks available</div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-4 mb-2">
//             <button onClick={prevMonth}><ChevronLeft /></button>
//             <button onClick={nextMonth}><ChevronRight /></button>
//           </div>
//           <div className="grid grid-cols-7 gap-1">
//             <div className="text-center">S</div>
//             <div className="text-center">M</div>
//             <div className="text-center">T</div>
//             <div className="text-center">W</div>
//             <div className="text-center">T</div>
//             <div className="text-center">F</div>
//             <div className="text-center">S</div>
//             {renderCalendar()}
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 border border-gray-500">
//         <div className="flex justify-between  bg-gray-950 items-center p-4 mb-2">
//           <h3>Plans</h3>
//           <button className="bg-black px-2 py-1 rounded">New Plan +</button>
//         </div>
//         <div className="bg-black rounded-lg p-4">
//           <div className="flex justify-between items-center">
//             <span>StarMerge_Sample</span>
//             <span>1</span>
//             <span>{selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
//             <span>481</span>
//             <button>...</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Projects;

import React, { useState } from 'react';
import { Calendar, FolderOpen, HelpCircle, Settings, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbartwo from '../Navbar/Navbartwo';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@react-md/dialog";

const Projects: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const renderCalendar = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const today = new Date();

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
            <button className="bg-gray-950 px-2 py-1 rounded" onClick={() => setIsModalOpen(true)}>Add +</button>
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

      <div className="mt-4 border border-gray-500">
        <div className="flex justify-between  bg-gray-950 items-center p-4 mb-2">
          <h3>Plans</h3>
          <button className="bg-black px-2 py-1 rounded">New Plan +</button>
        </div>
        <div className="bg-black rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span>StarMerge_Sample</span>
            <span>1</span>
            <span>{selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span>481</span>
            <button>...</button>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block mb-1">Date</label>
              <input type="date" id="date" className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label htmlFor="time" className="block mb-1">Time</label>
              <input type="time" id="time" className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label htmlFor="priority" className="block mb-1">Priority</label>
              <input type="text" id="priority" className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label htmlFor="assignee" className="block mb-1">Assignee</label>
              <input type="text" id="assignee" className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label htmlFor="type" className="block mb-1">Type</label>
              <input type="text" id="type" className="w-full bg-gray-800 rounded p-2" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea id="description" rows={4} className="w-full bg-gray-800 rounded p-2"></textarea>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Create</button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;