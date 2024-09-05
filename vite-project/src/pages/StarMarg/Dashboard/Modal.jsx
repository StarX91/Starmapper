import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-neutral-400 hover:text-red-500"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
