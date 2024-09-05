import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from "firebase/auth";
import { auth } from '../../components/firebaseConfig'; // Adjust the import path
import starx91 from '../../components/assets/starx91.jpg';
import bck from "../../components/assets/bck.jpg";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('Please Enter the password');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    if (!oobCode) {
      setMessage('Invalid or missing code.');
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    if (!oobCode) {
      setMessage('Invalid or missing code.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage('Password has been reset. You can now log in with your new password.');
      navigate('/login');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='bg-black h-full sm:w-screen sm:h-screen lg:h-screen lg:w-screen'>
      <div className='bg-black min-[320px]:h-full sm:w-full sm:h-fit lg:h-max md:h-fit lg:w-full'>
        <div className='flex justify-center content-center pt-4'>
          <img src={starx91} className='w-36 h-8 px-5'/>
        </div>
        <div className='flex max-w-screen min-[320px] flex-wrap-reverse place-content-center md:flex-wrap-reverse lg:flex-nowrap'>
          <div className='flex-row min-[320px] px-12 sm:px-28 mt-24 2xl:mt-44 mb-5'>
            <h1 className='text-white text-2xl font-bold'>Welcome Back!</h1>
            <h2 className='text-white mb-5'>Reset your password to get flying.</h2>
            <form onSubmit={handleResetPassword}>
              <div className='flex flex-col gap-y-2 text-zinc-400 mb-4'>
                <label htmlFor="password">New Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required 
                  className='min-[320px] h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' 
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className='min-[320px] h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' 
                />
                <button 
                  type="submit" 
                  className='bg-white text-black rounded-md h-10 gap-34 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700'>
                  Reset
                </button>
              </div>
            </form>
            {message && 
              <div className='flex gap-2 text-sm text-red-800 bg-red-950 py-1 font-semibold justify-center'>
                {message}
              </div>
            }
          </div>
          <div className='container-lg flex place-content-center'>
            <img src={bck} className='size-5/6'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
