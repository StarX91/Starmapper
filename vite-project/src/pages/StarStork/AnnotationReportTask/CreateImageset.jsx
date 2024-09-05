import React from "react";
import { useState } from "react";
import Navbar from "../../../components/Navbar"

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const handleAddProject = () => {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString(
      "default",
      { month: "long" }
    )} ${today.getFullYear()}`;
    const newProject = {
      id: projects.length + 1,
      title: newProjectName,
      image: null,
      date: formattedDate,
      details: "0",
    };
    setProjects([...projects, newProject]);
    setModalOpen(false);
    setNewProjectName("");
  };
  return (
    <div className="bg-black text-white">
        <Navbar/>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">
          Annotation Report Task
        </h1>
        <div className="flex justify-center py-4">
          <div className="bg-zinc-800 text-zinc-300 px-5 py-2 mr-16 font-semibold  rounded-2xl">
            Create Task
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-zinc-700 text-zinc-300 px-8 py-2 mr-16  font-semibold  rounded-2xl"
          >
            Images
          </button>
          <div className="bg-zinc-800 text-zinc-300 px-9 py-2 mr-16  font-semibold rounded-2xl">
            Setup
          </div>
          <div className="bg-zinc-800 text-zinc-300 px-8 py-2 font-semibold rounded-2xl">
            Report
          </div>
        </div>
        <div className="bg-zinc-900 h-96 py-4 mt-12 rounded-2xl ">
          <div className="flex justify-between relative mb-4">
            <div className="text-zinc-500 ml-8 mt-2 text-[18px] font-bold">
              Imageset (0)
            </div>

            {modalOpen && (
              <div className="fixed inset-0 bg-neutral-950 bg-opacity-70 flex items-center justify-center">
                <div className="bg-neutral-900 p-4 rounded-lg text-center shadow-lg w-1/3">
                  <h2 className="text-lg text-neutral-500 font-bold mb-2">
                    Create an ImageSet
                  </h2>
                  <h6 className="text-lg text-neutral-400 font-semibold mb-4">
                    To upload an image you need to create an imageset
                  </h6>
                  <input
                    type="text"
                    className="w-full px-3 py-2 mb-4 border border-neutral-900 bg-neutral-800 rounded-md placeholder-neutral-600 text-neutral-500"
                    placeholder="Enter Name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                  <div className="flex justify-center font-semibold">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-1 border-solid border-2 border-neutral-600 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-400 rounded-md mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProject}
                      className="px-5 py-2 bg-neutral-700 hover:bg-neutral-800 text-neutral-400 rounded-md"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className=" mt-2">
              <button className="bg-zinc-800 text-zinc-500 text-[17px] px-6 py-2 mr-8 font-semibold rounded-md border-2 border-zinc-400">
                + Imageset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;