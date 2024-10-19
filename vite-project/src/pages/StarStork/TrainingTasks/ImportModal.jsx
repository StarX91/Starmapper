import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaGoogleDrive } from "react-icons/fa";
import { MdFolder } from "react-icons/md";
import useDrivePicker from 'react-google-drive-picker';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImportModal = ({ isOpen, onClose, uid }) => {
  if (!isOpen) return null;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openPicker] = useDrivePicker();

  // File drop zone logic
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Convert the file to Base64 format and add to selected files
          setSelectedFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, base64: reader.result.split(',')[1] }, // Store Base64 without the prefix
          ]);
        };
        reader.readAsDataURL(file); // Convert to Base64
      });
    },
    accept: {
      'application/zip': ['.zip'],
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  });

  // Google Drive Picker logic
  const handleOpenPicker = () => {
    openPicker({
      clientId: "261778488059-r3p7jn1uctichj37qi3kq21j1fghclns.apps.googleusercontent.com",
      developerKey: "AIzaSyBmgOeT4pJLy5aquVqsMW8UHliEmLhWhHE",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
          return;
        }

        if (data.docs && data.docs.length > 0) {
          const driveFiles = data.docs.map((file) => ({
            name: file.name,
            mimeType: file.mimeType,
            size: file.sizeBytes,
            webViewLink: file.webViewLink,
            iconUrl: file.iconUrl,
          }));
          setSelectedFiles((prevFiles) => [...prevFiles, ...driveFiles]);
        } else {
          console.error('No files selected');
        }
      },
    });
  };

  // File upload logic to send Base64 to the backend
  const handleFileUpload = async () => {
    const uid = localStorage.getItem('uid');
    console.log(uid);
    const filesToUpload = selectedFiles.map(file => ({
      name: file.name,
      base64: file.base64 || null, 
      driveLink: file.webViewLink || null,
    }));

    try {
      const response = await axios.post(`http://localhost:5000/upload-images/starstork/${uid}`, {
        images: filesToUpload,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('File upload success:', response.data.images);
      setSelectedFiles([]);
      window.location.reload();
    } catch (error) {
      console.error('File upload failed', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg max-w-3xl w-full h-3/5">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-neutral-300 text-center text-2xl font-bold">Import</h2>
        </div>

        {/* Content */}
        <div className="flex justify-around mb-6">
          {/* Google Drive Picker */}
          <button
            className="flex flex-col border border-neutral-400 p-6 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200"
            onClick={handleOpenPicker}
          >
            <FaGoogleDrive size={48} />
            <span>Google Drive {">"}</span>
          </button>

          {/* Local Storage */}
          <div
            {...getRootProps({
              className: 'flex flex-col border border-neutral-400 p-6 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200 cursor-pointer',
            })}
          >
            <input {...getInputProps()} />
            <MdFolder size={48} />
            <span>Local Storage {">"}</span>
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div
          {...getRootProps({
            className: 'border-2 border-dashed border-neutral-500 rounded-lg p-12 h-50 text-center flex justify-center items-center text-neutral-400',
          })}
        >
          <input {...getInputProps()} />
          <p>Drop the files here.</p>
        </div>

        {/* Selected Files List */}
        <div className="my-4">
          <h3 className="text-neutral-300 mb-2">Selected Files:</h3>
          <ul className="text-neutral-400">
            {selectedFiles.length > 0 ? (
              selectedFiles.map((file, index) => (
                <li key={index}>{file.name || 'Google Drive File'}</li>
              ))
            ) : (
              <li>No files selected.</li>
            )}
          </ul>
        </div>

        {/* Upload and Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700"
            onClick={handleFileUpload}
          >
            Upload Files
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;


// import React from "react";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { FaGoogleDrive, FaFolderOpen } from "react-icons/fa"; // Import Google Drive and Folder icons

// const ImportModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
//       <div className="bg-neutral-900 p-8 rounded-lg w-[40rem]">
//         {" "}
//         {/* Updated width for better layout */}
//         <h2 className="text-neutral-300 text-center text-2xl font-medium mb-6">
//           Import
//         </h2>
//         <div className="flex justify-around mb-6">
//           {" "}
//           {/* Adjusted margin */}
//           {/* Google Drive Button */}
//           <button className="relative w-36 h-24 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-lg flex flex-col justify-center items-center hover:border-neutral-400">
//             <FaGoogleDrive className="text-3xl mb-2" />{" "}
//             {/* Google Drive Icon */}
//             Google Drive
//             <MdKeyboardArrowRight className="absolute bottom-2 right-2 text-neutral-400" />
//           </button>
//           {/* Local Storage Button */}
//           <button className="relative w-36 h-24 bg-neutral-900 text-neutral-300 border border-neutral-500 rounded-lg flex flex-col justify-center items-center hover:border-neutral-400">
//             <FaFolderOpen className="text-3xl mb-2" />{" "}
//             {/* Local Storage Icon */}
//             Local Storage
//             <MdKeyboardArrowRight className="absolute bottom-2 right-2 text-neutral-400" />
//           </button>
//         </div>
//         {/* Dotted File Drop Area */}
//         <div className="border-dashed border-2 border-neutral-500 h-32 mb-6 rounded-lg flex items-center justify-center">
//           <span className="text-neutral-400">Drop the files here.</span>
//         </div>
//         {/* Cancel Button */}
//         <button
//           className="bg-neutral-900 text-neutral-300 py-2 px-6 rounded-md focus:outline-none hover:border-neutral-500 border mx-auto block"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImportModal;