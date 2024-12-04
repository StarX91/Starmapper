


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFileImport } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import NewProjectModal from "../TrainingTasks/NewProjectModal";
import ImportModal from "../TrainingTasks/ImportModal";
import ImagesetModal from "../TrainingTasks/ImagesetModal";
import Navbar from "../../../components/Navbar";
import axios from 'axios';
import StarStorkImages from "./ImagesStarStork";
import FileImportModal from "../TrainingTasks/ImportImages";


const TrainingTask = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isTaskNameModalOpen, setIsTaskNameModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isFileImportModalOpen, setIsFileImportModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskName, setTaskName] = useState("");
  const [imagesetName , setImagesetName]=useState("");
  const [showImagesComponent, setShowImagesComponent] = useState(false);
  const [activeStep, setActiveStep] = useState("Create Task");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isImagesetModalOpen, setIsImagesetModalOpen] = useState(false);
  const [imageModal , setImageModal] = useState(false);
  const [isTaskAssigned, setIsTaskAssigned] = useState(false);
  const [isAnnotated, setIsAnnotated] = useState(false);
  const [images, setImages] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [imageCollections, setImageCollections] = useState([]);
  const [currentlyEditingIndex, setCurrentlyEditingIndex] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [currentDetails, setCurrentDetails] = useState(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    setNewCollectionName('');
  };

  const saveNewCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        name: newCollectionName,
        date: new Date().toLocaleDateString(),
      };
      setImageCollections([...imageCollections, newCollection]);
      togglePopup();
    }
  };

  const removeCollection = (index, event) => {
    event.stopPropagation();
    const updatedCollections = imageCollections.filter((_, i) => i !== index);
    setImageCollections(updatedCollections);
    setCurrentlyEditingIndex(null);
  };

  const editCollectionName = (index, event) => {
    event.stopPropagation();
    const updatedName = prompt('Enter new name:', imageCollections[index].name);
    if (updatedName?.trim()) {
      const updatedCollections = [...imageCollections];
      updatedCollections[index] = {
        ...updatedCollections[index],
        name: updatedName
      };
      setImageCollections(updatedCollections);
    }
    setCurrentlyEditingIndex(null);
  };

  const showDetails = (collection) => {
    setCurrentDetails(collection);
  };

  const navigateBack = () => {
    setCurrentDetails(null);
  };

  const filteredCollections = imageCollections.filter(collection =>
    collection.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const toggleFileImportModal = () => {
    setIsFileImportModalOpen(!isFileImportModalOpen);
  };

  const navigate = useNavigate();

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return; // No UID, don't fetch images

      try {
        const response = await axios.get(
          `http://localhost:5000/get-images/starstork/${uid}`
        );
        setImages(response.data.images); // Assuming 'images' is an array of Base64 strings
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, [uid]);

  const handleAnnotateSuccess = () => {
    setIsAnnotated(true);
  };

  const toggleNewProjectModal = () => {
    setIsNewProjectModalOpen(!isNewProjectModalOpen);
  };

  const toggleTaskNameModal = () => {
    setIsTaskNameModalOpen(!isTaskNameModalOpen);
  };

  const toggleImportModal = () => {
    setIsImportModalOpen(!isImportModalOpen);
  };

  const toggleImagesetModal = () => {
    setIsImagesetModalOpen(!isImagesetModalOpen);
  };

  const addNewProject = (name) => {
    const newProject = {
      name,
      date: new Date().toLocaleDateString(),
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const deleteProject = (index) => {
    setProjects((prevProjects) =>
      prevProjects.filter((_, projectIndex) => projectIndex !== index)
    );
    setEditingProjectIndex(null);
  };

  const renameProject = (index) => {
    const newName = prompt(
      "Enter the new name for the project:",
      projects[index].name
    );
    if (newName) {
      setProjects((prevProjects) =>
        prevProjects.map((project, projectIndex) =>
          projectIndex === index ? { ...project, name: newName } : project
        )
      );
    }
    setEditingProjectIndex(null);
  };

  const openTaskModal = (index) => {
    setSelectedProject(projects[index]);
    setIsTaskNameModalOpen(true);
    setActiveStep("Create Task");
    setShowImagesComponent(false);
  };

  const handleCreateTask = () => {
    if (taskName.trim() !== "") {
      console.log(
        `Task "${taskName}" created for project: ${selectedProject.name}`
      );
      setIsTaskNameModalOpen(false);
      setTaskName("");
      // setImageModal(true);
      setShowImagesComponent(true);
      setActiveStep("Images");
      // setIsTaskAssigned(true);
    } else {
      alert("Task name cannot be empty");
    }
  };

  const handleImagesetCreation = () => {
    if (imagesetName.trim() !== "") {
      console.log(
        `Imageset "${imagesetName}" created for project: ${selectedProject.name}`
      );
      setImageModal(false);
      setImagesetName("");
      setShowImagesComponent(true);
      setActiveStep("Images");
      setIsTaskAssigned(true);
    } else {
      alert("Imageset name cannot be empty");
    }
  };

  const handleSetupClick = () => {
    if (isAnnotated) {
      navigate("/setup");
    } else {
      alert("Please complete the image set annotation first.");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="space-y-8 p-2 min-h-screen">
        <div className="flex justify-center items-center p-4">
          <h1 className="text-neutral-300 text-3xl font-semibold">
            Annotation Report Task
          </h1>
        </div>

        <div className="flex justify-center ">
          <button
            className={` px-6 rounded-full ${
              activeStep === "Create Task"
                ? "bg-black text-neutral-400 hover:border-neutral-400 border"
                : "bg-neutral-900 text-neutral-500"
            }`}
          >
            Create Task
          </button>

          <div className="w-16 h-0.5 mt-5  bg-red-800"></div>

          <button
            className={` px-10 rounded-full ${
              activeStep === "Images"
                ? "bg-black text-neutral-500 hover:border-neutral-400 border"
                : "bg-neutral-900 text-neutral-400"
            }`}
            onClick={() => {
              if (!isTaskAssigned) {
                alert("Create a task first");
              } else {
                setActiveStep("Images");
                setShowImagesComponent(true);
              }
            }}
          >
            Images
          </button>
          <div className="w-16 h-0.5 mt-5  bg-red-800"></div>

          <button
            className="bg-neutral-900 text-neutral-400  px-12 rounded-full focus:outline-none"
            onClick={handleSetupClick}
          >
            Setup
          </button>

          <div className="w-16 h-0.5 mt-5  bg-red-800"></div>
          <button
            className="bg-neutral-900 text-neutral-400 py-2 px-10 rounded-full focus:outline-none"
            onClick={() => alert("Complete the setup first")}
          >
            Report
          </button>
        </div>

        {!showImagesComponent ? (
          <div className="bg-neutral-900 h-96 p-6 m-6 min-h-[560px] rounded-lg shadow-md space-y-8 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="relative flex items-center w-1/5">
                <FaSearch className="absolute left-3 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search Tasks"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-neutral-800 text-neutral-400 rounded-md focus:outline-none"
                />
              </div>

              <h2 className="text-neutral-500 text-lg font-medium">
                Select Project
              </h2>

              <button
                className="bg-neutral-900 text-neutral-300 py-2 px-4 rounded-md focus:outline-none hover:border-neutral-500 border"
                onClick={toggleNewProjectModal}
              >
                + New Project
              </button>
            </div>

            <div className="flex-1 flex flex-wrap justify-start space-x-6 items-start">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="relative p-4 rounded-lg w-60 h-full flex flex-col cursor-pointer"
                    onClick={() => openTaskModal(index)}
                  >
                    <div className="bg-neutral-700 h-40 w-40 rounded-md"></div>

                    <div className="mt-2 flex justify-between items-center w-full">
                      <div>
                        <p className="text-neutral-300 text-md">
                          {project.name}
                        </p>
                        <p className="text-neutral-500 text-sm">
                          {project.date}
                        </p>
                      </div>

                      <div className="relative">
                        <button
                          className="text-neutral-400 mr-12 hover:text-neutral-300 mb-4 focus:outline-none font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProjectIndex(
                              editingProjectIndex === index ? null : index
                            );
                          }}
                        >
                          ...
                        </button>
                        {editingProjectIndex === index && (
                          <div className="absolute right-0 mt-2 w-24 bg-neutral-800 text-neutral-300 rounded-md shadow-lg">
                            <button
                              className="block w-full px-2 py-1 hover:bg-neutral-700 text-left"
                              onClick={(e) => {
                                e.stopPropagation();
                                renameProject(index);
                              }}
                            >
                              Rename
                            </button>
                            <button
                              className="block w-full px-2 py-1 hover:bg-neutral-700 text-left"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(index);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-400">No projects found.</p>
              )}
            </div>
          </div>
        ) : (

<div className="bg-neutral-900 h-96 p-6 m-6 min-h-[560px] rounded-lg shadow-md space-y-8 flex flex-col">
{currentDetails ? (
            <div className="flex flex-col lg:flex-row bg-neutral-900 m-4 sm:m-8 min-h-[550px] p-4 sm:p-8 rounded-2xl shadow-md lg:justify-between lg:items-start gap-4">
            <h2 className="text-neutral-400 text-lg font-medium">
              Project name / Imageset (0)
            </h2>
            {/* Display Uploaded Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
              {uid ? (
                images.length > 0 ? (
                  images.map((image, index) => (
                    <div
                      key={index}
                      className="border border-neutral-500 p-2 rounded-lg"
                    >
                      {image.data ? (
                        <a
                          href={`data:image/png;base64,${image.data}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`data:image/png;base64,${image.data}`}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto"
                          />
                        </a>
                      ) : image.driveLink ? (
                        <a
                          href={image.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={image.driveLink}
                            alt={`Drive Image ${index + 1}`}
                            className="w-full h-auto"
                          />
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500">No images uploaded.</p>
                )
              ) : (
                <p className="text-neutral-500">Please log in to view your images.</p>
              )}
            </div>
            <div className="relative inline-block text-left">
              <div>
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                }}
                className="text-neutral-300 border border-neutral-400 p-3 rounded-md whitespace-nowrap"
              >
                + Imageset
              </button>
              </div>
          
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                  <div
                    className="py-2 bg-black rounded-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div>
                    <button
                      onClick={() => {
                        // setDropdownOpen(false);
                        // toggleFileImportModal();
                        toggleFileImportModal();
                      }}
                      className="text-neutral-400 group flex items-center px-4 py-2 text-sm hover:bg-neutral-700 w-full"
                    >
                      <FaFileImport className="mr-3" />
                      Import
                    </button>
                    {isFileImportModalOpen && (
                    <FileImportModal onClose={toggleFileImportModal} />
                  )}
                    </div>
                  
          
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        toggleImagesetModal();
                      }}
                      className="text-neutral-400 group flex items-center px-4 py-2 text-sm hover:bg-neutral-700 w-full"
                    >
                      <CgAddR className="mr-3" />
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
) : (
  <>
    <div className="flex justify-between items-center">
      <div className="relative flex items-center w-1/5">
        <FaSearch className="absolute left-3 text-neutral-500" />
        <input
          type="text"
          placeholder="Search Imagesets"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-neutral-800 text-neutral-400 rounded-md focus:outline-none"
        />
      </div>

      <h2 className="text-neutral-500 text-lg font-medium">
        Imagesets
      </h2>

      <button
        className="bg-neutral-900 text-neutral-300 py-2 px-4 rounded-md focus:outline-none hover:border-neutral-500 border"
        onClick={togglePopup}
      >
        + New Imageset
      </button>
    </div>

    <div className="flex-1 flex flex-wrap justify-start space-x-6 items-start">
      {filteredCollections.length > 0 ? (
        filteredCollections.map((collection, index) => (
          <div
            key={index}
            className="relative p-4 rounded-lg w-60 h-full flex flex-col cursor-pointer"
            onClick={() => showDetails(collection)}
          >
            <div className="bg-neutral-700 h-40 w-40 rounded-md"></div>

            <div className="mt-2 flex justify-between items-center w-full">
              <div>
                <p className="text-neutral-300 text-md">
                  {collection.name}
                </p>
                <p className="text-neutral-500 text-sm">
                  {collection.date}
                </p>
              </div>

              <div className="relative">
                <button
                  className="text-neutral-400 mr-12 hover:text-neutral-300 mb-4 focus:outline-none font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentlyEditingIndex(currentlyEditingIndex === index ? null : index);
                  }}
                >
                  ...
                </button>
                {currentlyEditingIndex === index && (
                  <div className="absolute right-0 mt-2 w-24 bg-neutral-800 text-neutral-300 rounded-md shadow-lg">
                    <button
                      className="block w-full px-2 py-1 hover:bg-neutral-700 text-left"
                      onClick={(e) => editCollectionName(index, e)}
                    >
                      Rename
                    </button>
                    <button
                      className="block w-full px-2 py-1 hover:bg-neutral-700 text-left"
                      onClick={(e) => removeCollection(index, e)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-neutral-400">No Imagesets found.</p>
      )}
    </div>

    {isPopupVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-neutral-800 p-6 rounded-lg w-96">
          <h3 className="text-neutral-300 text-lg mb-4">Create New Imagesets</h3>
          <input
            type="text"
            placeholder="Collection Name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="w-full bg-neutral-700 text-neutral-300 p-2 rounded-md mb-4 focus:outline-none"
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 text-neutral-400 hover:text-neutral-300"
              onClick={togglePopup}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={saveNewCollection}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </>
)}
</div>
        )}

{isImportModalOpen && <ImportModal onClose={toggleImportModal} />}
      {isNewProjectModalOpen && <NewProjectModal onClose={toggleNewProjectModal} />}
      {isImagesetModalOpen && <ImagesetModal onClose={() => setIsImagesetModalOpen(false)} />}

        <NewProjectModal
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
          onSave={(name) => {
            addNewProject(name);
            setIsNewProjectModalOpen(false);
          }}
        />
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
        <ImagesetModal
          isOpen={isImagesetModalOpen}
          onClose={() => setIsImagesetModalOpen(false)}
          navigate={navigate}
        />
        <div>
        <div>
            {isTaskNameModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <div className="bg-neutral-900 p-8 shadow-lg  rounded-2xl w-1/4">
                  <h2 className="text-neutral-300 text-center text-xl font-medium mb-2">
                    Enter Task Name
                  </h2>
                  <p className="text-neutral-400 text-center mb-6">
                    To proceed, give task name to selected project.
                  </p>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="p-3 bg-neutral-800 text-neutral-300 rounded-md w-full focus:outline-none"
                    placeholder="Enter name"
                  />
                  <div className="flex justify-between mt-6">
                    <button
                      className="bg-neutral-900 text-neutral-400 py-2 px-10 rounded-md focus:outline-none hover:border-neutral-300 border border-neutral-400"
                      onClick={() => {
                        setIsTaskNameModalOpen(false);
                        setTaskName(""); // Reset the task name
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-neutral-200 text-neutral-900 py-2 px-6 rounded-md focus:outline-none font-semibold hover:bg-neutral-200"
                      onClick={handleCreateTask}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            )}

{imageModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <div className="bg-neutral-900 p-8 shadow-lg  rounded-2xl w-1/4">
                  <h2 className="text-neutral-300 text-center text-xl font-medium mb-2">
                    Enter Imageset Name
                  </h2>
                  <p className="text-neutral-400 text-center mb-6">
                   Create a immageset (optional)
                  </p>
                  <input
                    type="text"
                    value={imagesetName}
                    onChange={(e) => setImagesetName(e.target.value)}
                    className="p-3 bg-neutral-800 text-neutral-300 rounded-md w-full focus:outline-none"
                    placeholder="Enter name"
                  />
                  <div className="flex justify-between mt-6">
                    <button
                      className="bg-neutral-900 text-neutral-400 py-2 px-10 rounded-md focus:outline-none hover:border-neutral-300 border border-neutral-400"
                      onClick={() => {
                        setImageModal(false);
                        setImagesetName("");
                        setShowImagesComponent(true);
                        setActiveStep("Images");
                        setIsTaskAssigned(true); // Reset the task name
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-neutral-200 text-neutral-900 py-2 px-6 rounded-md focus:outline-none font-semibold hover:bg-neutral-200"
                      onClick={handleImagesetCreation}
                    >
                      Create Imageset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingTask;
