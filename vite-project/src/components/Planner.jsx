

// import React, { useState } from 'react';
// import { Bell, ChevronLeft, ChevronRight, Plus, Search, User } from 'lucide-react';
// import Navbartwo from '../pages/StarMarg/Navbar/Navbartwo';

// const TaskPlanner = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     date: '',
//     time: '',
//     description: '',
//     priority: 'Medium',
//     assignee: ''
//   });

//   const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
//   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//   const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

//   const toggleModal = () => setShowModal(!showModal);

//   const goToPreviousMonth = () => {
//     setCurrentDate(prevDate => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() - 1);
//       return newDate;
//     });
//   };

//   const goToNextMonth = () => {
//     setCurrentDate(prevDate => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() + 1);
//       return newDate;
//     });
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   const formatMonthYear = (date) => {
//     return date.toLocaleString('default', { month: 'long', year: 'numeric' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAssignTask = () => {
//     setTasks(prev => [...prev, newTask]);
//     setNewTask({
//       date: '',
//       time: '',
//       description: '',
//       priority: 'Medium',
//       assignee: ''
//     });
//     toggleModal();
//   };

//   const getTasksForDate = (date) => {
//     return tasks.filter(task => task.date === date);
//   };

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbartwo />

//       <div className='p-4'>
//         <h2 className="text-xl font-bold">Tasks</h2>
//       </div>
//       <div className="flex">
//         <main className="flex-grow p-4">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center space-x-2">
//               <button onClick={goToPreviousMonth} className="hover:bg-gray-700 p-1 rounded">
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <span>{formatMonthYear(currentDate)}</span>
//               <button onClick={goToNextMonth} className="hover:bg-gray-700 p-1 rounded">
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button onClick={goToToday} className="bg-blue-500 text-white px-3 py-1 rounded">Today</button>
//               <button
//                 onClick={toggleModal}
//                 className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
//               >
//                 <Plus className="w-4 h-4 mr-1" /> Add
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-7 gap-1">
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//               <div key={day} className="text-center font-bold">{day}</div>
//             ))}
//             {emptyDays.map(day => (
//               <div key={`empty-${day}`} className="h-24 bg-gray-800 rounded"></div>
//             ))}
//             {days.map(day => {
//               const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//               const dayTasks = getTasksForDate(date);
//               return (
//                 <div key={day} className="h-24 bg-gray-800 rounded p-1 overflow-y-auto">
//                   <span className="text-sm">{day}</span>
//                   {dayTasks.map((task, index) => (
//                     <div key={index} className={`text-xs mt-1 p-1 rounded ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
//                       {task.description}
//                     </div>
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </main>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-6 rounded-lg w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Assign Task</h3>
//               <button onClick={toggleModal} className="text-gray-400 hover:text-white">
//                 &times;
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Date</label>
//                 <input type="date" name="date" value={newTask.date} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Time</label>
//                 <input type="time" name="time" value={newTask.time} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Description</label>
//                 <textarea name="description" value={newTask.description} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" rows={3}></textarea>
//               </div>
//               <div className="flex space-x-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1">Priority</label>
//                   <select name="priority" value={newTask.priority} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2">
//                     <option>Low</option>
//                     <option>Medium</option>
//                     <option>High</option>
//                   </select>
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1">Assignee</label>
//                   <input type="text" name="assignee" value={newTask.assignee} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" placeholder="Enter assignee" />
//                 </div>
//               </div>
//               <button onClick={handleAssignTask} className="w-full bg-blue-500 text-white rounded py-2 mt-4">
//                 Assign Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskPlanner;

import React, { useState } from 'react';
import { Bell, ChevronLeft, ChevronRight, Plus, Search, User } from 'lucide-react';
import Navbartwo from '../pages/StarMarg/Navbar/Navbartwo';

import Navbar from './ServicesNavbar';

const TaskPlanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    date: '',
    time: '',
    description: '',
    priority: 'Medium',
    assignee: ''
  });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const toggleModal = () => setShowModal(!showModal);
  const toggleTaskDetailsModal = () => setShowTaskDetailsModal(!showTaskDetailsModal);

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAssignTask = () => {
    setTasks(prev => [...prev, newTask]);
    setNewTask({
      date: '',
      time: '',
      description: '',
      priority: 'Medium',
      assignee: ''
    });
    toggleModal();
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => task.date === date);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    toggleTaskDetailsModal();
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className='p-4'>
        <h2 className="text-xl font-bold">Tasks</h2>
      </div>
      <div className="flex">
        <main className="flex-grow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button onClick={goToPreviousMonth} className="hover:bg-gray-700 p-1 rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span>{formatMonthYear(currentDate)}</span>
              <button onClick={goToNextMonth} className="hover:bg-gray-700 p-1 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={goToToday} className="bg-blue-500 text-white px-3 py-1 rounded">Today</button>
              <button
                onClick={toggleModal}
                className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-bold">{day}</div>
            ))}
            {emptyDays.map(day => (
              <div key={`empty-${day}`} className="h-24 bg-gray-800 rounded"></div>
            ))}
            {days.map(day => {
              const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayTasks = getTasksForDate(date);
              return (
                <div key={day} className="h-24 bg-gray-800 rounded p-1 overflow-y-auto">
                  <span className="text-sm">{day}</span>
                  {dayTasks.map((task, index) => (
                    <div 
                      key={index} 
                      className={`text-xs mt-1 p-1 rounded cursor-pointer ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      onClick={() => handleTaskClick(task)}
                    >
                      {task.description}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Assign Task</h3>
              <button onClick={toggleModal} className="text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input type="date" name="date" value={newTask.date} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input type="time" name="time" value={newTask.time} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" value={newTask.description} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" rows={3}></textarea>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select name="priority" value={newTask.priority} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Assignee</label>
                  <input type="text" name="assignee" value={newTask.assignee} onChange={handleInputChange} className="w-full bg-gray-700 rounded px-3 py-2" placeholder="Enter assignee" />
                </div>
              </div>
              <button onClick={handleAssignTask} className="w-full bg-blue-500 text-white rounded py-2 mt-4">
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}

      {showTaskDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Task Details</h3>
              <button onClick={toggleTaskDetailsModal} className="text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <p>{selectedTask.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <p>{selectedTask.time}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <p>{selectedTask.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <p>{selectedTask.priority}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assignee</label>
                <p>{selectedTask.assignee}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPlanner;