import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileImportModal = ({ onClose }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedImageSet, setSelectedImageSet] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const userUid = localStorage.getItem('uid');

  // Fetch projects from the database based on user UID
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${userUid}`);
        setProjects(response.data.folders || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [userUid]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
  });

  const handleProjectSelect = async (project) => {
    setSelectedProject(project);
    setSelectedTask(null);
    setSelectedImageSet(null);

    // Fetch tasks for the selected project
    try {
      const response = await axios.get(`http://localhost:5000/tasks/${project.folderName}`);
      setSelectedProject({ ...project, subFolders: response.data.subFolders });
      console.log(selectedProject);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskSelect = async (task) => {
    setSelectedTask(task);
    setSelectedImageSet(null);

    // Fetch image sets for the selected task
    try {
      const response = await axios.get(`http://localhost:5000/api/image-sets/${task.folderName}`);
      setSelectedTask({ ...task, imagesets: response.data.imagesets });
    } catch (error) {
      console.error('Error fetching image sets:', error);
    }
  };

  const handleImageSetSelect = (imageSet) => {
    setSelectedImageSet(imageSet);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedProject || !selectedTask || !selectedImageSet) {
        console.error('Please select a project, task, and image set before uploading files.');
        return;
      }
  
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.append('images[]', JSON.stringify({
            name: file.name,
            base64: e.target.result, // Convert file to base64
          }));
        };
        reader.readAsDataURL(file);
      });
  
      // Append other fields to match the schema
      formData.append('uid', userUid); // From localStorage
      formData.append('folderName', selectedProject.folderName);
      formData.append('taskName', selectedTask.folderName);
      formData.append('imageSetName', selectedImageSet.folderName);
  
      const response = await axios.post('http://localhost:5000/api/upload-image-set', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload successful:', response.data);
      onClose(); // Close the modal after successful upload
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-neutral-800">
          <h2 className="text-neutral-300 text-center text-2xl font-bold">Import</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Project Selection */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-neutral-300 mb-2 font-medium">Select a Project:</h3>
            <ul className="text-neutral-400 space-y-1">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <li
                    key={project.folderName}
                    className={`px-2 py-1 rounded cursor-pointer ${
                      selectedProject?.folderName === project.folderName
                        ? 'bg-neutral-700 text-neutral-300'
                        : 'hover:bg-neutral-700 hover:text-neutral-300'
                    }`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    {project.folderName}
                  </li>
                ))
              ) : (
                <li>No projects available</li>
              )}
            </ul>
          </div>

          {/* Task Selection */}
          {selectedProject && (
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-neutral-300 mb-2 font-medium">Select a Task:</h3>
              <ul className="text-neutral-400 space-y-1">
                {selectedProject.subFolders?.length > 0 ? (
                  selectedProject.subFolders.map((task) => (
                    <li
                      key={task.folderName}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        selectedTask?.folderName === task.folderName
                          ? 'bg-neutral-700 text-neutral-300'
                          : 'hover:bg-neutral-700 hover:text-neutral-300'
                      }`}
                      onClick={() => handleTaskSelect(task)}
                    >
                      {task.folderName}
                    </li>
                  ))
                ) : (
                  <li>No tasks available</li>
                )}
              </ul>
            </div>
          )}

          {/* Image Set Selection */}
          {selectedTask && (
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-neutral-300 mb-2 font-medium">Select an Image Set:</h3>
              <ul className="text-neutral-400 space-y-1">
                {selectedTask.imagesets?.length > 0 ? (
                  selectedTask.imagesets.map((imageSet) => (
                    <li
                      key={imageSet.folderName}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        selectedImageSet?.folderName === imageSet.folderName
                          ? 'bg-neutral-700 text-neutral-300'
                          : 'hover:bg-neutral-700 hover:text-neutral-300'
                      }`}
                      onClick={() => handleImageSetSelect(imageSet)}
                    >
                      {imageSet.folderName}
                    </li>
                  ))
                ) : (
                  <li>No image sets available</li>
                )}
              </ul>
            </div>
          )}

          {/* Selected Files */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-neutral-300 mb-2 font-medium">Selected Files:</h3>
            <ul className="text-neutral-400 space-y-1">
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file, index) => (
                  <li key={index}>{file.name || 'Google Drive File'}</li>
                ))
              ) : (
                <li>No files selected</li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 flex justify-between gap-4">
          <button
            className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700 transition-colors flex-1"
            onClick={handleFileUpload}
          >
            Upload Files
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700 transition-colors flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileImportModal;
