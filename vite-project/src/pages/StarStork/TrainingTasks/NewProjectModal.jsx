/*import React, { useState } from "react";
import Modal from "react-modal"; // Ensure you install 'react-modal'

const NewProjectModal = ({ isOpen, onClose, onSave }) => {
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    if (projectName.trim()) {
      onSave(projectName); // Call the function passed from the parent
      setProjectName(""); // Clear the input field
      onClose(); // Close the modal after adding the project
    } else {
      alert("Please enter a project name.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Project"
      className="bg-neutral-900 p-8 rounded-xl shadow-xl w-1/3 mx-auto mt-40"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
    >
      {/* Modal Header 
      <h2 className="text-neutral-300 text-center text-xl font-semibold mb-6">
        Add New Project
      </h2>

      {/* Project Name Input 
      <div className="mb-6">
        <label className="text-neutral-500 text-sm mb-2 block">Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter name"
          className=" w-10/12 p-2 bg-neutral-800 text-neutral-300 rounded-md focus:outline-none"
        />
      </div>

      {/* Empty Container 
      <div className="bg-neutral-800 h-40 mb-6 rounded-md"></div>

      {/* Modal Buttons 
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="bg-neutral-900 text-neutral-400  px-8 rounded-md border-neutral-400 hover:border-neutral-300 border"
        >
          Cancel
        </button>
        <button
          onClick={handleAddProject}
          className="bg-neutral-200 text-neutral-900 font-semibold py-1 px-10 rounded-md hover:bg-neutral-600"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default NewProjectModal; */
import React, { useState } from "react";
import Modal from "react-modal"; // Ensure you install 'react-modal'
import GoogleMap from "../../StarMarg/CreateProject/Map";
const NewProjectModal = ({ isOpen, onClose, onSave }) => {
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    if (projectName.trim()) {
      onSave(projectName); // Call the function passed from the parent
      setProjectName(""); // Clear the input field
      onClose(); // Close the modal after adding the project
    } else {
      alert("Please enter a project name.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Project"
      className="bg-neutral-900 p-6 md:p-8 rounded-xl shadow-xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-24 sm:mt-32 md:mt-40"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
    >
      {/* Modal Header */}
      <h2 className="text-neutral-300 text-center text-lg md:text-xl font-semibold mb-4 md:mb-6">
        Add New Project
      </h2>

      {/* Project Name Input */}
      <div className="mb-4 md:mb-6">
        <label className="text-neutral-500 text-sm mb-2 block">
          Project Name
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter name"
          className="w-full sm:w-11/12 p-2 bg-neutral-800 text-neutral-300 rounded-md focus:outline-none"
        />
      </div>

      <div className="bg-neutral-800 mb-4 md:mb-6 rounded-md overflow-hidden">
        <div className="w-full h-48 sm:h-60 relative">
          {/* Set height for better layout control */}
          <GoogleMap className="absolute inset-0 w-full h-full" />
        </div>
      </div>
      {/* Modal Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="bg-neutral-900 text-neutral-400 px-6 py-2 rounded-md border-neutral-400 hover:border-neutral-300 border text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          onClick={handleAddProject}
          className="bg-neutral-200 text-neutral-900 font-semibold py-2 px-8 rounded-md hover:bg-neutral-600 text-sm md:text-base"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default NewProjectModal;