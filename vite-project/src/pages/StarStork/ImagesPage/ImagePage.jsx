import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFileImport } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import ImportModal from "./ImportModal";
import Navbar from "../../../components/Navbar";
import axios from 'axios';

const ImageAssignment = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  
  // Dummy data for projects and tasks
  const dummyProjects = [
    { id: 1, name: "Project A", tasks: ["Task 1", "Task 2", "Task 3"] },
    { id: 2, name: "Project B", tasks: ["Task 4", "Task 5"] },
    { id: 3, name: "Project C", tasks: ["Task 6", "Task 7", "Task 8"] }
  ];
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/get-images/starstork/${uid}`
        );
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, [uid]);

  const toggleImportModal = () => {
    setIsImportModalOpen(!isImportModalOpen);
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsAssignModalOpen(true);
    // Reset selections when opening modal for a new image
    setSelectedProject(null);
    setSelectedTask(null);
  };

  const handleBulkSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const AssignModal = () => {
    if (!isAssignModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-neutral-900 p-6 rounded-lg w-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-neutral-300 text-xl font-bold">Assign Image to Project</h2>
            <button 
              onClick={() => setIsAssignModalOpen(false)}
              className="text-neutral-400 hover:text-neutral-300"
            >
              ✕
            </button>
          </div>

          {/* Preview of selected image */}
          {currentImage && (
            <div className="mb-6">
              <div className="w-full h-48 flex justify-center items-center bg-neutral-800 rounded-lg overflow-hidden">
                <img
                  src={currentImage.data ? `data:image/png;base64,${currentImage.data}` : currentImage.driveLink}
                  alt="Selected image"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Project Selection */}
          <div className="mb-4">
            <label className="block text-neutral-400 mb-2 font-medium">Select Project</label>
            <select 
              className="w-full bg-neutral-800 text-neutral-300 p-3 rounded-md border border-neutral-700 focus:border-blue-500 outline-none"
              value={selectedProject?.id || ""}
              onChange={(e) => {
                const project = dummyProjects.find(p => p.id === parseInt(e.target.value));
                setSelectedProject(project);
                setSelectedTask(null); // Reset task when project changes
              }}
            >
              <option value="">Choose a project</option>
              {dummyProjects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Task Selection */}
          {selectedProject && (
            <div className="mb-6">
              <label className="block text-neutral-400 mb-2 font-medium">Select Task</label>
              <select 
                className="w-full bg-neutral-800 text-neutral-300 p-3 rounded-md border border-neutral-700 focus:border-blue-500 outline-none"
                value={selectedTask || ""}
                onChange={(e) => setSelectedTask(e.target.value)}
              >
                <option value="">Choose a task</option>
                {selectedProject.tasks.map(task => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="px-6 py-2 bg-neutral-800 text-neutral-300 rounded-md hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Assigned image to ${selectedTask} in ${selectedProject?.name}`);
                setIsAssignModalOpen(false);
                setCurrentImage(null);
                setSelectedProject(null);
                setSelectedTask(null);
              }}
              disabled={!selectedProject || !selectedTask}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-neutral-700 disabled:cursor-not-allowed"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="space-y-8 p-2 min-h-screen">
        <div className="flex bg-neutral-900 m-8 min-h-[550px] p-8 rounded-2xl shadow-md flex-col">
          {/* Header with actions */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-neutral-400 text-lg font-medium">
              Image Assignment ({images.length})
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAssignModalOpen(true)}
                disabled={selectedImages.length === 0}
                className="text-neutral-300 border border-neutral-400 p-3 rounded-md disabled:opacity-50 hover:bg-neutral-800 transition-colors"
              >
                Assign Selected ({selectedImages.length})
              </button>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-neutral-300 border border-neutral-400 p-3 rounded-md hover:bg-neutral-800 transition-colors"
                >
                  + Add Images
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-neutral-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        toggleImportModal();
                      }}
                      className="text-neutral-400 flex items-center px-4 py-2 hover:bg-neutral-700 w-full rounded-md"
                    >
                      <FaFileImport className="mr-3" />
                      Import
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-4 gap-4 overflow-y-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative border border-neutral-500 p-2 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
                  selectedImages.includes(image) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleImageClick(image)}
              >
                {image.data ? (
                  <img
                    src={`data:image/png;base64,${image.data}`}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                ) : image.driveLink ? (
                  <img
                    src={image.driveLink}
                    alt={`Drive Image ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
        <AssignModal />
      </div>
    </div>
  );
};

export default ImageAssignment;