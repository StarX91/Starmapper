import React from "react";

const ProjectDropdown = () => {
  return (
    <div className="bg-zinc-800 p-2 rounded-md flex items-center">
      <select className="bg-zinc-800 text-white p-2 rounded-md">
        <option>Projects</option>
        {/* Add more options as needed */}
      </select>
      <button className="ml-2 bg-zinc-700 p-2 rounded-md">+</button>
    </div>
  );
};

export default ProjectDropdown;
