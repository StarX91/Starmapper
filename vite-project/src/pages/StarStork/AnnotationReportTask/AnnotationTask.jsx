import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFileImport } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
//import NewProjectModal from "./NewProjectModal";
//import ImportModal from "./ImportModal";
//import ImagesetModal from "./ImagesetModal";
//import Navbar from "../../StarStork/Dashboard/Navbar";
import NewProjectModal from "../TrainingTasks/NewProjectModal";
import ImportModal from "../TrainingTasks/ImportModal";
import ImagesetModal from "../TrainingTasks/ImagesetModal";
import Navbar from "../../../components/Navbar";
import axios from 'axios';

const TrainingTask = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isTaskNameModalOpen, setIsTaskNameModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskName, setTaskName] = useState("");
  const [showImagesComponent, setShowImagesComponent] = useState(false);
  const [activeStep, setActiveStep] = useState("Create Task");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isImagesetModalOpen, setIsImagesetModalOpen] = useState(false);
  const [isTaskAssigned, setIsTaskAssigned] = useState(false);
  const [isAnnotated, setIsAnnotated] = useState(false);
  const [images, setImages] = useState([]);

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
      setShowImagesComponent(true);
      setActiveStep("Images");
      setIsTaskAssigned(true);
    } else {
      alert("Task name cannot be empty");
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
          <div className="flex bg-neutral-900 m-8 min-h-[550px] p-8 rounded-2xl shadow-md justify-between items-start">
            <h2 className="text-neutral-400 text-lg font-medium">
              Project name / Imageset (0)
            </h2>
                                  {/* Display Uploaded Images */}
                                  <div className="grid grid-cols-4 gap-4">
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
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-neutral-300 border border-neutral-400 p-3 rounded-md"
              >
                + Imageset
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-2  bg-black rounded-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        toggleImportModal();
                      }}
                      className="text-neutral-400 group flex items-center px-4 py-2 text-sm hover:bg-neutral-700 w-full"
                    >
                      <FaFileImport className="mr-3" />
                      Import
                    </button>
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
        )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingTask;
