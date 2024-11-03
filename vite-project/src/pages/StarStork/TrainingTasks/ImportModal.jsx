// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import { FaGoogleDrive } from "react-icons/fa";
// import { MdFolder } from "react-icons/md";
// import useDrivePicker from 'react-google-drive-picker';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const ImportModal = ({ isOpen, onClose, uid }) => {
//   if (!isOpen) return null;
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [openPicker] = useDrivePicker();
//   const navigate = useNavigate();

//   // File drop zone logic
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       acceptedFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           // Convert the file to Base64 format and add to selected files
//           setSelectedFiles((prevFiles) => [
//             ...prevFiles,
//             { name: file.name, base64: reader.result.split(',')[1] }, // Store Base64 without the prefix
//           ]);
//         };
//         reader.readAsDataURL(file); // Convert to Base64
//       });
//     },
//     accept: {
//       'application/zip': ['.zip'],
//       'application/pdf': ['.pdf'],
//       'image/jpeg': ['.jpeg', '.jpg'],
//       'image/png': ['.png'],
//     },
//   });

//   // Google Drive Picker logic
//   const handleOpenPicker = () => {
//     openPicker({
//       clientId: "261778488059-r3p7jn1uctichj37qi3kq21j1fghclns.apps.googleusercontent.com",
//       developerKey: "AIzaSyBmgOeT4pJLy5aquVqsMW8UHliEmLhWhHE",
//       viewId: "DOCS",
//       showUploadView: true,
//       showUploadFolders: true,
//       supportDrives: true,
//       multiselect: true,
//       callbackFunction: (data) => {
//         if (data.action === 'cancel') {
//           console.log('User clicked cancel/close button');
//           return;
//         }

//         if (data.docs && data.docs.length > 0) {
//           const driveFiles = data.docs.map((file) => ({
//             name: file.name,
//             mimeType: file.mimeType,
//             size: file.sizeBytes,
//             webViewLink: file.webViewLink,
//             iconUrl: file.iconUrl,
//           }));
//           setSelectedFiles((prevFiles) => [...prevFiles, ...driveFiles]);
//         } else {
//           console.error('No files selected');
//         }
//       },
//     });
//   };

//   // File upload logic to send Base64 to the backend
//   const handleFileUpload = async () => {
//     const uid = localStorage.getItem('uid');
//     console.log(uid);
//     const filesToUpload = selectedFiles.map(file => ({
//       name: file.name,
//       base64: file.base64 || null, 
//       driveLink: file.webViewLink || null,
//     }));

//     try {
//       const response = await axios.post(`http://localhost:5000/upload-images/starstork/${uid}`, {
//         images: filesToUpload,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('File upload success:', response.data.images);
//       setSelectedFiles([]);
//       if (location.pathname === '/ss/images') {
//         window.location.reload();
//       } else {
//         navigate('/ss/images');
//       }
//     } catch (error) {
//       console.error('File upload failed', error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-neutral-900 p-6 rounded-lg max-w-3xl w-full h-3/5">
//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-neutral-300 text-center text-2xl font-bold">Import</h2>
//         </div>

//         {/* Content */}
//         <div className="flex justify-around mb-6">
//           {/* Google Drive Picker */}
//           <button
//             className="flex flex-col border border-neutral-400 p-6 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200"
//             onClick={handleOpenPicker}
//           >
//             <FaGoogleDrive size={48} />
//             <span>Google Drive {">"}</span>
//           </button>

//           {/* Local Storage */}
//           <div
//             {...getRootProps({
//               className: 'flex flex-col border border-neutral-400 p-6 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200 cursor-pointer',
//             })}
//           >
//             <input {...getInputProps()} />
//             <MdFolder size={48} />
//             <span>Local Storage {">"}</span>
//           </div>
//         </div>

//         {/* Drag and Drop Area */}
//         <div
//           {...getRootProps({
//             className: 'border-2 border-dashed border-neutral-500 rounded-lg p-12 h-50 text-center flex justify-center items-center text-neutral-400',
//           })}
//         >
//           <input {...getInputProps()} />
//           <p>Drop the files here.</p>
//         </div>

//         {/* Selected Files List */}
//         <div className="my-4">
//           <h3 className="text-neutral-300 mb-2">Selected Files:</h3>
//           <ul className="text-neutral-400">
//             {selectedFiles.length > 0 ? (
//               selectedFiles.map((file, index) => (
//                 <li key={index}>{file.name || 'Google Drive File'}</li>
//               ))
//             ) : (
//               <li>No files selected.</li>
//             )}
//           </ul>
//         </div>

//         {/* Upload and Cancel Buttons */}
//         <div className="flex justify-between mt-4">
//           <button
//             className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700"
//             onClick={handleFileUpload}
//           >
//             Upload Files
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-neutral-800 text-neutral-300 border border-neutral-500 rounded-md hover:bg-neutral-700"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportModal;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogleDrive } from "react-icons/fa";
import { MdFolder } from "react-icons/md";
import useDrivePicker from 'react-google-drive-picker';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImportModal = ({ isOpen, onClose, uid }) => {
  if (!isOpen) return null;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openPicker] = useDrivePicker();
  const navigate = useNavigate();

  // File drop zone logic
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, base64: reader.result.split(',')[1] },
          ]);
        };
        reader.readAsDataURL(file);
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
        }
      },
    });
  };

  const handleFileUpload = async () => {
    const uid = localStorage.getItem('uid');
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
      if (location.pathname === '/ss/images') {
        window.location.reload();
      } else {
        navigate('/ss/images');
      }
    } catch (error) {
      console.error('File upload failed', error);
    }
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
          {/* Import Options */}
          <div className="flex justify-around gap-4 mb-6">
            {/* Google Drive Picker */}
            <button
              className="flex-1 flex flex-col border border-neutral-400 p-4 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
              onClick={handleOpenPicker}
            >
              <FaGoogleDrive size={32} />
              <span>Google Drive</span>
            </button>

            {/* Local Storage */}
            <div
              {...getRootProps({
                className: 'flex-1 flex flex-col border border-neutral-400 p-4 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer',
              })}
            >
              <input {...getInputProps()} />
              <MdFolder size={32} />
              <span>Local Storage</span>
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
            {...getRootProps({
              className: 'border-2 border-dashed border-neutral-500 rounded-lg p-6 text-center flex justify-center items-center text-neutral-400 min-h-[120px]',
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
  );
};

export default ImportModal;