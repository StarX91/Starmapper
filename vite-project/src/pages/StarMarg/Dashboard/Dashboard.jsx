/*import React, { useState } from "react";
import { FaFolder, FaPlus, FaPen } from "react-icons/fa";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Main = () => {
  // ... (useState hooks remain unchanged)
  const [imageSections, setImageSections] = useState([
    { id: 1, label: "Sample_Windmill_1", date: "10 June 2024" },
    { id: 2, label: "Sample_Windmill_2", date: "10 June 2024" },
    { id: 3, label: "Sample_Windmill_3", date: "10 June 2024" },
  ]);

  const [planSections, setPlanSections] = useState([
    { id: 1, label: "Sample_Windmill_1", date: "10 June 2024" },
    { id: 2, label: "Sample_Windmill_2", date: "10 June 2024" },
    { id: 3, label: "Sample_Windmill_3", date: "10 June 2024" },
  ]);

  const [projectSections, setProjectSections] = useState([
    { id: 1, label: "Project_Name_1", date: "10 June 2024" },
    { id: 2, label: "Project_Name_2", date: "10 June 2024" },
    { id: 3, label: "Project_Name_3", date: "10 June 2024" },
  ]);

  const [activeItem, setActiveItem] = useState({ section: null, id: null });
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingId, setEditingId] = useState(null); // Tracks the id of the project being edited
  const [editProjectName, setEditProjectName] = useState(""); // Tracks the new name input

  const handleAddProject = (name) => {
    const newId = projectSections.length + 1;
    const newProject = {
      id: newId,
      label: name,
      date: "10 June 2024",
    };
    setProjectSections([...projectSections, newProject]);
  };

  const handleDelete = (id, setter) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirmAdd = () => {
    handleAddProject(newProjectName);
    setShowModal(false);
    setNewProjectName("");
  };

  const handleEditClick = (id, label) => {
    setEditingId(id);
    setEditProjectName(label);
  };

  const handleRename = (id) => {
    setProjectSections((prevSections) =>
      prevSections.map((project) =>
        project.id === id ? { ...project, label: editProjectName } : project
      )
    );
    setEditingId(null); // Exit editing mode
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24 font-sans">
      <ImageSection
        title="Recent Activity"
        items={imageSections}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onDelete={(id) => handleDelete(id, setImageSections)}
      />
      <ProjectSection
        projects={projectSections}
        onAdd={() => setShowModal(true)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onDelete={(id) => handleDelete(id, setProjectSections)}
        onEdit={handleEditClick}
        onRename={handleRename}
        editingId={editingId}
        editProjectName={editProjectName}
        setEditProjectName={setEditProjectName}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4 bg-neutral-800">
            <h2 className="text-2xl mb-4 text-neutral-300">Add New Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full mb-4 p-2 border border-neutral-300 rounded-md bg-neutral-700"
              placeholder="Enter project name"
            />
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-neutral-900 text-white rounded hover:bg-neutral-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-neutral-900 text-white rounded hover:bg-neutral-600"
                onClick={handleConfirmAdd}
                disabled={!newProjectName.trim()}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ImageSection = ({
  title,
  items,
  activeItem,
  setActiveItem,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleDropdownChange = (e) => {
    if (e.target.value === "create-project") {
      navigate("/create-project");
    }
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl text-neutral-300 font-bold mb-2 sm:mb-0">
          {title}
        </h2>
        <div className="flex items-center">
          <select
            className="bg-neutral-950 text-neutral-300 mr-4 p-2 rounded border border-neutral-400 text-sm sm:text-base"
            onChange={handleDropdownChange}
          >
            <option value="" disabled selected hidden>
              + New Map
            </option>
            <option value="create-project">Create Project</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 bg-neutral-900 rounded-2xl p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow-lg relative bg-neutral-500 overflow-hidden aspect-square w-full max-w-[240px] mx-auto"
          >
            <div className="absolute bottom-0 left-0 w-full p-2 bg-neutral-900">
              <h3 className="text-base sm:text-lg text-neutral-300 font-semibold truncate">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-semibold">
                {item.date}
              </p>
              <button
                onClick={() =>
                  setActiveItem({
                    section: "image",
                    id: activeItem.id === item.id ? null : item.id,
                  })
                }
                className="absolute top-1 right-1 p-2 text-neutral-300 font-bold hover:text-red-500"
              >
                ...
              </button>
              {activeItem.section === "image" && activeItem.id === item.id && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="absolute top-10 right-1 text-neutral-400 hover:text-red-500 text-xs sm:text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectSection = ({
  projects,
  onAdd,
  onDelete,
  activeItem,
  setActiveItem,
  onEdit,
  onRename,
  editingId,
  editProjectName,
  setEditProjectName,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <select className="bg-neutral-800 px-4 sm:px-8 text-neutral-300 p-2 rounded text-sm sm:text-base">
            <option value="" disabled selected hidden>
              Projects
            </option>
            <option>Project 1</option>
            <option>Project 2</option>
          </select>
        </div>
        <div>
          <button className="bg-neutral-950 text-neutral-300 px-4 py-2 rounded border border-neutral-400 text-sm sm:text-base">
            + New Task
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 bg-neutral-900 rounded-xl p-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl p-4 relative">
            <div className="bg-neutral-500 shadow-lg rounded-lg aspect-square w-full max-w-[208px] mx-auto"></div>
            <div className="mt-2 p-1 bg-neutral-900 shadow-lg">
              <div className="flex justify-between items-center">
                {editingId === project.id ? (
                  <>
                    <input
                      type="text"
                      value={editProjectName}
                      onChange={(e) => setEditProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onRename(project.id);
                      }}
                      className="bg-neutral-800 text-neutral-400 rounded-md p-2 text-sm w-full"
                    />
                    <button
                      className="ml-2 text-xs sm:text-sm bg-neutral-700 text-white rounded-md px-2 py-1"
                      onClick={() => onRename(project.id)}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-base sm:text-lg text-neutral-400 font-semibold truncate">
                      {project.label}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(project.id, project.label)}
                        className="text-neutral-300 font-bold hover:text-green-500"
                      >
                        <FaPen className="text-xs sm:text-sm" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveItem({
                            section: "project",
                            id:
                              activeItem.id === project.id ? null : project.id,
                          })
                        }
                        className="text-neutral-300 font-bold hover:text-red-500"
                      >
                        ...
                      </button>
                    </div>
                  </>
                )}
              </div>
              <p className="text-neutral-500 font-semibold text-xs sm:text-sm">
                {project.date}
              </p>
              {activeItem.section === "project" &&
                activeItem.id === project.id && (
                  <div className="absolute bottom-0 right-5 mb-4 flex space-x-2">
                    <button
                      onClick={() => onDelete(project.id)}
                      className="text-neutral-400 hover:text-red-500 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
        <div className="rounded-lg p-4 hover:cursor-pointer">
          <button
            onClick={onAdd}
            className="flex flex-col items-center justify-center w-full h-full aspect-square max-w-[208px] mx-auto rounded-lg shadow-lg text-neutral-400 hover:bg-neutral-600"
          >
            <FaPlus className="text-xl sm:text-2xl mb-2" />
            <span className="text-xs sm:text-sm">Add Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main; */

/*import React, { useState } from "react";
import { FaFolder, FaPlus, FaPen } from "react-icons/fa";
import Modal from "./Modal";
import CreateProject from "../CreateProject/CreateProject";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [imageSections, setImageSections] = useState([
    { id: 1, label: "Sample_Windmill_1", date: "10 June 2024" },
    { id: 2, label: "Sample_Windmill_2", date: "10 June 2024" },
    { id: 3, label: "Sample_Windmill_3", date: "10 June 2024" },
  ]);

  const [planSections, setPlanSections] = useState([
    { id: 1, label: "Sample_Windmill_1", date: "10 June 2024" },
    { id: 2, label: "Sample_Windmill_2", date: "10 June 2024" },
    { id: 3, label: "Sample_Windmill_3", date: "10 June 2024" },
  ]);

  const [projectSections, setProjectSections] = useState([
    { id: 1, label: "Project_Name_1", date: "10 June 2024" },
  ]);

  const [activeItem, setActiveItem] = useState({ section: null, id: null });
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");

  const navigate = useNavigate();

  const handleAddProject = (name) => {
    const newId = projectSections.length + 1;
    const newProject = {
      id: newId,
      label: name,
      date: "10 June 2024",
    };
    setProjectSections([...projectSections, newProject]);
  };

  const handleDelete = (id, setter) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirmAdd = () => {
    handleAddProject(newProjectName);
    setShowModal(false);
    setNewProjectName("");
  };

  const handleEditClick = (id, label) => {
    setEditingId(id);
    setEditProjectName(label);
  };

  const handleRename = (id) => {
    setProjectSections((prevSections) =>
      prevSections.map((project) =>
        project.id === id ? { ...project, label: editProjectName } : project
      )
    );
    setEditingId(null);
  };

  const handleCreateProjectClick = () => {
    navigate("/create-project");
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24 font-sans">
      <ImageSection
        title="Recent Activity"
        items={imageSections}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onDelete={(id) => handleDelete(id, setImageSections)}
      />
      <ProjectSection
        projects={projectSections}
        activeItem={activeItem}
        onAdd={() => setShowModal(true)}
        setActiveItem={setActiveItem}
        onDelete={(id) => handleDelete(id, setProjectSections)}
        onEdit={handleEditClick}
        onRename={handleRename}
        editingId={editingId}
        editProjectName={editProjectName}
        setEditProjectName={setEditProjectName}
        onCreateProjectClick={handleCreateProjectClick}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4 bg-neutral-800">
            <h2 className="text-2xl mb-4 text-neutral-300">Add New Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full mb-4 p-2 border border-neutral-300 rounded-md bg-neutral-700"
              placeholder="Enter project name"
            />
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-neutral-900 text-white rounded hover:bg-neutral-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-neutral-900 text-white rounded hover:bg-neutral-600"
                onClick={handleConfirmAdd}
                disabled={!newProjectName.trim()}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ImageSection = ({
  title,
  items,
  activeItem,
  setActiveItem,
  onDelete,
}) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl text-neutral-300 font-bold mb-2 sm:mb-0">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 bg-neutral-900 rounded-2xl p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow-lg relative bg-neutral-500 overflow-hidden aspect-square w-full max-w-[240px] mx-auto"
          >
            <div className="absolute bottom-0 left-0 w-full p-2 bg-neutral-900">
              <h3 className="text-base sm:text-lg text-neutral-300 font-semibold truncate">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-semibold">
                {item.date}
              </p>
              <button
                onClick={() =>
                  setActiveItem({
                    section: "image",
                    id: activeItem.id === item.id ? null : item.id,
                  })
                }
                className="absolute top-1 right-1 p-2 text-neutral-300 font-bold hover:text-red-500"
              >
                ...
              </button>
              {activeItem.section === "image" && activeItem.id === item.id && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="absolute top-10 right-1 text-neutral-400 hover:text-red-500 text-xs sm:text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectSection = ({
  projects,
  onDelete,
  activeItem,
  setActiveItem,
  onEdit,
  onRename,
  editingId,
  editProjectName,
  setEditProjectName,
  onAdd,
  onCreateProjectClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-4">
        <button
          onClick={onCreateProjectClick}
          className="bg-neutral-800 px-4 sm:px-8 text-neutral-300 p-2 rounded text-sm sm:text-base"
        >
          Create Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 bg-neutral-900 rounded-xl p-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl p-4 relative">
            <div className="bg-neutral-500 shadow-lg rounded-lg aspect-square w-full max-w-[208px] mx-auto"></div>
            <div className="mt-2 p-1 bg-neutral-900 shadow-lg">
              <div className="flex justify-between items-center">
                {editingId === project.id ? (
                  <>
                    <input
                      type="text"
                      value={editProjectName}
                      onChange={(e) => setEditProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onRename(project.id);
                        }
                      }}
                      className="w-full p-1 text-xs bg-neutral-700 border border-neutral-500 rounded-md text-neutral-300"
                    />
                    <button
                      className="text-xs text-neutral-400 hover:text-neutral-300 ml-2"
                      onClick={() => onRename(project.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-xs sm:text-sm text-neutral-300 font-bold truncate">
                        {project.label}
                      </h3>
                      <p className="text-xs text-neutral-500">{project.date}</p>
                    </div>
                    <button
                      className="text-xs text-neutral-400 hover:text-neutral-300 ml-16"
                      onClick={() => onEdit(project.id, project.label)}
                    >
                      <FaPen />
                    </button>
                  </>
                )}
                <button
                  onClick={() =>
                    setActiveItem({
                      section: "project",
                      id: activeItem.id === project.id ? null : project.id,
                    })
                  }
                  className=" p-2 text-neutral-300 font-bold hover:text-red-500"
                >
                  ...
                </button>
                 {activeItem.section === "project" &&
                  activeItem.id === project.id && (
                    <button
                      onClick={() => onDelete(project.id)}
                      className="bottom-5 text-neutral-400 hover:text-red-500 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  )} 
                {activeItem.section === "project" &&
                  activeItem.id === project.id && (
                    <div className=" top-6 flex flex-col bg-neutral-700 p-1 rounded-md">
                      <button
                        className="text-xs text-neutral-400 hover:text-neutral-300"
                        onClick={() => onEdit(project.id, project.label)}
                      >
                        Rename
                      </button>
                      <button
                        className="text-xs text-neutral-400 hover:text-red-500"
                        onClick={() => onDelete(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main; */
import React, { useState } from "react";
import { FaFolder, FaPlus, FaPen } from "react-icons/fa";
import Modal from "./Modal";
import CreateProject from "../CreateProject/CreateProject";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [imageSections, setImageSections] = useState([
    { id: 1, label: "Sample_Windmill_1", date: "10 June 2024" },
    { id: 2, label: "Sample_Windmill_2", date: "10 June 2024" },
    { id: 3, label: "Sample_Windmill_3", date: "10 June 2024" },
  ]);

  const [planSections, setPlanSections] = useState([
    { id: 1, label: "Sample_Windmill_1", date: "10 June 2024" },
    { id: 2, label: "Sample_Windmill_2", date: "10 June 2024" },
    { id: 3, label: "Sample_Windmill_3", date: "10 June 2024" },
  ]);

  const [projectSections, setProjectSections] = useState([
    { id: 1, label: "Project_Name_1", date: "10 June 2024" },
  ]);

  const [activeItem, setActiveItem] = useState({ section: null, id: null });
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");

  const navigate = useNavigate();

  const handleAddProject = (name) => {
    const newId = projectSections.length + 1;
    const newProject = {
      id: newId,
      label: name,
      date: "10 June 2024",
    };
    setProjectSections([...projectSections, newProject]);
  };

  const handleDelete = (id, setter) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirmAdd = () => {
    handleAddProject(newProjectName);
    setShowModal(false);
    setNewProjectName("");
  };

  const handleEditClick = (id, label) => {
    setEditingId(id);
    setEditProjectName(label);
  };

  const handleRename = (id) => {
    setProjectSections((prevSections) =>
      prevSections.map((project) =>
        project.id === id ? { ...project, label: editProjectName } : project
      )
    );
    setEditingId(null);
  };

  const handleCreateProjectClick = () => {
    navigate("/create-project");
  };

  return (
    <div className="bg-black min-h-screen text-neutral-300 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24 font-sans">
      <ImageSection
        title="Recent Activity"
        items={imageSections}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onDelete={(id) => handleDelete(id, setImageSections)}
      />
      <ProjectSection
        projects={projectSections}
        activeItem={activeItem}
        onAdd={() => setShowModal(true)}
        setActiveItem={setActiveItem}
        onDelete={(id) => handleDelete(id, setProjectSections)}
        onEdit={handleEditClick}
        onRename={handleRename}
        editingId={editingId}
        editProjectName={editProjectName}
        setEditProjectName={setEditProjectName}
        onCreateProjectClick={handleCreateProjectClick}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4 bg-neutral-800">
            <h2 className="text-2xl mb-4 text-neutral-300">Add New Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full mb-4 p-2 border border-neutral-300 rounded-md bg-neutral-700"
              placeholder="Enter project name"
            />
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-neutral-900 text-white rounded hover:bg-neutral-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-neutral-900 text-white rounded hover:bg-neutral-600"
                onClick={handleConfirmAdd}
                disabled={!newProjectName.trim()}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ImageSection = ({
  title,
  items,
  activeItem,
  setActiveItem,
  onDelete,
}) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl text-neutral-300 font-bold mb-2 sm:mb-0">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 bg-neutral-900 rounded-2xl p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow-lg relative bg-neutral-500 overflow-hidden aspect-square w-full max-w-[240px] mx-auto"
          >
            <div className="absolute bottom-0 left-0 w-full p-2 bg-neutral-900">
              <h3 className="text-base sm:text-lg text-neutral-300 font-semibold truncate">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-semibold">
                {item.date}
              </p>
              <button
                onClick={() =>
                  setActiveItem({
                    section: "image",
                    id: activeItem.id === item.id ? null : item.id,
                  })
                }
                className="absolute top-1 right-1 p-2 text-neutral-300 font-bold hover:text-red-500"
              >
                ...
              </button>
              {activeItem.section === "image" && activeItem.id === item.id && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="absolute top-10 right-1 text-neutral-400 hover:text-red-500 text-xs sm:text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectSection = ({
  projects,
  onDelete,
  activeItem,
  setActiveItem,
  onEdit,
  onRename,
  editingId,
  editProjectName,
  setEditProjectName,
  onAdd,
  onCreateProjectClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-4">
        <button
          onClick={onCreateProjectClick}
          className="bg-neutral-800 px-4 sm:px-8 text-neutral-300 p-2 rounded text-sm sm:text-base"
        >
          Create Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 bg-neutral-900 rounded-xl p-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl p-4 relative">
            <div className="bg-neutral-500 shadow-lg rounded-lg aspect-square w-full max-w-[208px] mx-auto"></div>
            <div className="mt-2 p-1 bg-neutral-900 shadow-lg">
              <div className="flex justify-between items-center">
                {editingId === project.id ? (
                  <>
                    <input
                      type="text"
                      value={editProjectName}
                      onChange={(e) => setEditProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onRename(project.id);
                        }
                      }}
                      className="w-full p-1 text-xs bg-neutral-700 border border-neutral-500 rounded-md text-neutral-300"
                    />
                    <button
                      className="text-xs text-neutral-400 hover:text-neutral-300 ml-2"
                      onClick={() => onRename(project.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-xs sm:text-sm text-neutral-300 font-bold truncate">
                        {project.label}
                      </h3>
                      <p className="text-xs text-neutral-500">{project.date}</p>
                    </div>
                    <button
                      className="p-1 text-neutral-400 hover:text-neutral-300 ml-2"
                      onClick={() => onEdit(project.id, project.label)}
                    >
                      <FaPen className="text-xs sm:text-sm" />
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() =>
                  setActiveItem({
                    section: "project",
                    id: activeItem.id === project.id ? null : project.id,
                  })
                }
                className="absolute  text-neutral-400 hover:text-neutral-300 text-xs sm:text-sm"
              >
                ...
              </button>
              {activeItem.section === "project" &&
                activeItem.id === project.id && (
                  <button
                    onClick={() => onDelete(project.id)}
                    className="absolute top-10 right-1 text-neutral-400 hover:text-red-500 text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                )}
            </div>
          </div>
        ))}
        <button
          onClick={onCreateProjectClick}
          className="flex items-center justify-center m-16 border border-dashed border-neutral-300 rounded-lg hover:bg-neutral-800"
        >
          <FaPlus className="mr-2 text-neutral-300" />
          <span className="text-neutral-300">Add Project</span>
        </button>
      </div>
    </div>
  );
};

export default Main;
