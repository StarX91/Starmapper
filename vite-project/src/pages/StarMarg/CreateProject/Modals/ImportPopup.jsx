import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaGoogleDrive } from "react-icons/fa";
import { MdFolder } from "react-icons/md";
import useDrivePicker from 'react-google-drive-picker';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImportPopup = ({show,onClose}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openPicker] = useDrivePicker();

  
  const uid = localStorage.getItem("uid");
  const projectName = localStorage.getItem("projectName");
  const subfolderName= localStorage.getItem("planName");
  const imagesetName = localStorage.getItem("imagesetName");
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
      clientId: "YOUR_CLIENT_ID",
      developerKey: "YOUR_DEVELOPER_KEY",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'cancel') return;

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

  const handleFileUpload = async () => {
    const filesToUpload = selectedFiles.map(file => ({
      name: file.name,
      base64: file.base64 || null,
      driveLink: file.webViewLink || null,
    }));
    console.log(filesToUpload);

    try {
      const response = await axios.post(`http://localhost:5000/upload-images/starmarg/${uid}`, {
        projectName,
        subfolderName,
        imagesetName,
        images: filesToUpload,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('File upload success:', response.data);
      setSelectedFiles([]);
      console.log(selectedFiles);
      // window.location.reload();
    } catch (error) {
      console.error('File upload failed', error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg max-w-3xl w-full h-3/5">
        <div className="mb-6">
          <h2 className="text-neutral-300 text-center text-2xl font-bold">Import</h2>
        </div>

        <div className="flex justify-around mb-6">
          <button
            className="flex flex-col border border-neutral-400 p-6 rounded-md items-center space-y-2 text-neutral-300 hover:text-neutral-200"
            onClick={handleOpenPicker}
          >
            <FaGoogleDrive size={48} />
            <span>Google Drive {">"}</span>
          </button>

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

        <div
          {...getRootProps({
            className: 'border-2 border-dashed border-neutral-500 rounded-lg p-12 h-50 text-center flex justify-center items-center text-neutral-400',
          })}
        >
          <input {...getInputProps()} />
          <p>Drop the files here.</p>
        </div>

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

export default ImportPopup;
