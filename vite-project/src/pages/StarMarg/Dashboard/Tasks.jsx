import React from 'react'
import Navbartwo from '../Navbar/Navbartwo'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Taskss = () => {


    const tasks = [
        { name: 'Dataset_1', status: 'Completed', images: 481, plan: 'Drone_Sample', dateCreated: '7 Aug 2024' }
      ];

  return (
    <div className="bg-black min-h-screen text-neutral-300 font-sans">
        <Navbartwo />
        <main className="p-6">
        <div className="flex items-center mb-6">
          <ArrowLeftIcon className="mr-2 h-6" />
          <h1 className="text-2xl font-bold">Tasks</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-xl mb-2">Tasks (1)</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-700 px-3 py-1 rounded">Completed (1)</button>
            <button className="bg-gray-800 px-3 py-1 rounded">In Progress (0)</button>
            <button className="bg-gray-800 px-3 py-1 rounded">Pending (0)</button>
            <button className="bg-gray-800 px-3 py-1 rounded">Failed (0)</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-red-600">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Images</th>
                <th className="text-left py-2 px-4">Plan</th>
                <th className="text-left py-2 px-4">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="">
                  <td className="py-2 px-4 text-blue-400">{task.name}</td>
                  <td className="py-2 px-4">{task.status}</td>
                  <td className="py-2 px-4">{task.images}</td>
                  <td className="py-2 px-4">{task.plan}</td>
                  <td className="py-2 px-4">{task.dateCreated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
        </div>
  )
}

export default Taskss;
