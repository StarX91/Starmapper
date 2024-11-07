import React, { useState } from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import { MdFolder } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';

const dummyProjects = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' },
  { id: 3, name: 'Project 3' },
];

const dummyTasks = [
  { id: 1, name: 'Task 1', projectId: 1 },
  { id: 2, name: 'Task 2', projectId: 1 },
  { id: 3, name: 'Task 3', projectId: 2 },
  { id: 4, name: 'Task 4', projectId: 2 },
  { id: 5, name: 'Task 5', projectId: 3 },
];

const dummyImageSets = [
  { id: 1, name: 'Image Set 1', taskId: 1 },
  { id: 2, name: 'Image Set 2', taskId: 2 },
  { id: 3, name: 'Image Set 3', taskId: 3 },
  { id: 4, name: 'Image Set 4', taskId: 4 },
  { id: 5, name: 'Image Set 5', taskId: 5 },
];

const FileImportModal = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedImageSet, setSelectedImageSet] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
  });

  const handleOpenPicker = () => {
    // Implement Google Drive picker functionality
  };

  const handleFileUpload = () => {
    // Implement file upload functionality
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setSelectedTask(null);
    setSelectedImageSet(null);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setSelectedImageSet(null);
  };

  const handleImageSetSelect = (imageSet) => {
    setSelectedImageSet(imageSet);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800">
          <h2 className="text-neutral-300 text-center text-2xl font-bold">Import</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Project Selection */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-neutral-300 mb-2 font-medium">Select a Project:</h3>
            <div className="max-h-32 overflow-y-auto">
              <ul className="text-neutral-400 space-y-1">
                {dummyProjects.map((project) => (
                  <li
                    key={project.id}
                    className={`px-2 py-1 rounded cursor-pointer ${
                      selectedProject?.id === project.id
                        ? 'bg-neutral-700 text-neutral-300'
                        : 'hover:bg-neutral-700 hover:text-neutral-300'
                    }`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    {project.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Task Selection */}
          {selectedProject && (
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-neutral-300 mb-2 font-medium">Select a Task:</h3>
              <div className="max-h-32 overflow-y-auto">
                <ul className="text-neutral-400 space-y-1">
                  {dummyTasks
                    .filter((task) => task.projectId === selectedProject.id)
                    .map((task) => (
                      <li
                        key={task.id}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          selectedTask?.id === task.id
                            ? 'bg-neutral-700 text-neutral-300'
                            : 'hover:bg-neutral-700 hover:text-neutral-300'
                        }`}
                        onClick={() => handleTaskSelect(task)}
                      >
                        {task.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {/* Image Set Selection */}
          {selectedTask && (
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-neutral-300 mb-2 font-medium">Select an Image Set:</h3>
              <div className="max-h-32 overflow-y-auto">
                <ul className="text-neutral-400 space-y-1">
                  {dummyImageSets
                    .filter((imageSet) => imageSet.taskId === selectedTask.id)
                    .map((imageSet) => (
                      <li
                        key={imageSet.id}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          selectedImageSet?.id === imageSet.id
                            ? 'bg-neutral-700 text-neutral-300'
                            : 'hover:bg-neutral-700 hover:text-neutral-300'
                        }`}
                        onClick={() => handleImageSetSelect(imageSet)}
                      >
                        {imageSet.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {/* Drag and Drop Area */}
          <div
            {...getRootProps({
              className:
                'border-2 border-dashed border-neutral-500 rounded-lg p-6 text-center flex justify-center items-center text-neutral-400 min-h-[120px]',
            })}
          >
            <input {...getInputProps()} />
            <p>Drop files here or click to select</p>
          </div>

          {/* Selected Files List */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-neutral-300 mb-2 font-medium">Selected Files:</h3>
            <div className="max-h-32 overflow-y-auto">
              <ul className="text-neutral-400 space-y-1">
                {selectedFiles.length > 0 ? (
                  selectedFiles.map((file, index) => (
                    <li key={index} className="truncate">
                      {file.name || 'Google Drive File'}
                    </li>
                  ))
                ) : (
                  <li>No files selected</li>
                )}
              </ul>
            </div>
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
  )
}

export default FileImportModal;