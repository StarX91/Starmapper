import React, { useState } from 'react';
import { Bell, ChevronDown, Key, X } from 'lucide-react';
import Navbar from '../../../components/ServicesNavbar';

const ApiKeyRow = ({ name, key, dateGenerated, limit, count, status }) => (
  <tr className="border-b border-gray-700">
    <td className="py-3 px-4">{name}</td>
    <td className="py-3 px-4">
      {key ? (
        <>
          {key.slice(0, 10)}... <span className="text-blue-400 cursor-pointer">View</span>
        </>
      ) : (
        'N/A'
      )}
    </td>
    <td className="py-3 px-4">{dateGenerated}</td>
    <td className="py-3 px-4">{limit}</td>
    <td className="py-3 px-4">{count}</td>
    <td className="py-3 px-4">
      <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">{status}</span>
    </td>
    <td className="py-3 px-4">
      <button className="text-gray-500 hover:text-gray-300">•••</button>
    </td>
  </tr>
);

const GenerateApiKeyModal = ({ isOpen, onClose, onGenerate }) => {
  const [apiName, setApiName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 text-gray-500 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-300">Generate API Key</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={20} />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="apiName" className="block text-sm font-medium text-gray-400 mb-1">
            API Name
          </label>
          <input
            type="text"
            id="apiName"
            className="w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter API name"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 mr-2"
          >
            Close
          </button>
          <button
            onClick={() => {
              onGenerate(apiName);
              setApiName('');
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

const ApiKeysDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateKey = (apiName) => {
    console.log(`Generating API key for: ${apiName}`);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-black text-gray-500">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="bg-gray-900 rounded-lg shadow">
            <div className="p-6 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-lg font-semibold text-gray-300">API Keys</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Key
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 text-xs uppercase text-gray-400">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Key</th>
                    <th className="py-3 px-4 text-left">Date Generated</th>
                    <th className="py-3 px-4 text-left">Limit</th>
                    <th className="py-3 px-4 text-left">Count</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <ApiKeyRow
                    name="Test"
                    key="uJFNNuoDZkW2a0..."
                    dateGenerated="04/16/2024"
                    limit="10"
                    count="0"
                    status="Active"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <GenerateApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerateKey}
      />
    </div>
  );
};

export default ApiKeysDashboard;