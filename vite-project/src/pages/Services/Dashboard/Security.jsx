import React, { useState } from 'react';
import { Bell, ChevronDown, Edit, Lock, CreditCard, Key, Mail, Users } from 'lucide-react';
import Navbar from '../../../components/ServicesNavbar';
import { Link } from 'react-router-dom';

const SecuritySettings = () => {
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);

  const toggleMFA = () => {
    setIsMFAEnabled(!isMFAEnabled);
  };

  return (
    <div className="bg-black min-h-screen text-gray-300">
    
      <div className="container mx-auto p-4">
       
       

          <section className="w-3/4 bg-gray-900 rounded-lg shadow p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-100">Login</h2>
                <Link to='/settings'>
                <button className="text-blue-400" >
                  <Edit size={16} />
                </button>
                </Link>
              
              </div>
              <p className="text-gray-400">Password</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-100">Security</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-100">Multi Factor Authentication (MFA)</p>
                  <p className="text-sm text-gray-400">After entering your password, you'll be asked for a second verification step.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isMFAEnabled}
                    onChange={toggleMFA}
                  />
                  <div className={`w-11 h-6 rounded-full peer ${
                    isMFAEnabled ? 'bg-blue-600' : 'bg-gray-700'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all
                  ${isMFAEnabled ? 'after:translate-x-full' : ''}`}>
                  </div>
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                MFA is currently {isMFAEnabled ? 'enabled' : 'disabled'}.
              </p>
            </div>
          </section>
      
      </div>
    </div>
  );
};

export default SecuritySettings;