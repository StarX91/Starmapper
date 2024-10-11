import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import appleIcon from '../../components/assets/apple.png';
import googleIcon from '../../components/assets/google.png';
import bck from "../../components/assets/bck.jpg";
import starx91 from '../../components/assets/starx91.jpg';
//import { ProfileContext } from '../../context/ProfileContext.jsx';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } from '../../components/firebaseConfig.jsx';
import axios from 'axios'; // Import axios for making HTTP requests
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import {useProfile} from '../../context/ProfileImageContext.jsx'
const Register = () => {
  const navigate = useNavigate();
  const { setImage } = useProfile();
  //const { setProfileImg } = useContext(ProfileContext);
  const [verificationMessage, setVerificationMessage] = useState('');

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const profileImgUrl = user.photoURL;
      const username = user.displayName || '';
  
      // Step 1: Check if the user already exists in MongoDB
      const userExistsResponse = await axios.get('http://localhost:5000/google-signin/check-user', {
        params: { email: user.email }
      });
  
      if (userExistsResponse.data.exists) {
        // Step 2: If the user exists, retrieve the user info
        const existingUser = userExistsResponse.data.user;
  
        // Store the user's profile image or any other info
        if(existingUser.image){
          setImage(`data:image/jpeg;base64,${existingUser.image}`);
        }
        else
        {
          setImage(existingUser.profile_img);
        }
        localStorage.setItem('uid', existingUser.uid);
        
        // Redirect to services page or wherever needed
        navigate('/services');
      } else {
        // Step 3: If the user doesn't exist, create a new user in MongoDB
        await axios.post('http://localhost:5000/google-signin', {
          uid: user.uid,
          username: username,
          email: user.email,
          profile_img: profileImgUrl,
        });
  
        // Store the new user's profile image
        setImage(profileImgUrl);
        localStorage.setItem('uid', user.uid);
  
        // Redirect to services page
        navigate('/services');
      }
    } catch (error) {
      console.error('Error during sign-in with Google: ', error);
      // Handle errors and provide feedback to the user
    }
  };
  

  const handleAppleSignIn = async () => {
    // Existing Apple sign-in logic...
  };

const handleSubmit = async (values, { setSubmitting }) => {
  const { username, email, password } = values;

  try {
    // Step 1: Check if the user already exists in the database
    const userExistsResponse = await axios.get('http://localhost:5000/register/check-user', {
      params: { email }
    });

    if (userExistsResponse.data.exists) {
      // Step 2: If the user exists, display a popup and stop further execution
      alert('User already exists. Please log in instead.');
      setSubmitting(false); // Stop the loading indicator
      return; // Exit the function to prevent further actions
    }

    // Step 3: If the user doesn't exist, proceed with Firebase registration
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 4: Send email verification
    await sendEmailVerification(user);
    setVerificationMessage(`A verification email has been sent to ${email}. Please check your inbox.`);

    // Step 5: Wait for the user to verify their email
    const checkEmailVerified = async () => {
      await user.reload(); // Reload user to check verification status
      if (user.emailVerified) {
        // Save user details to MongoDB only after verification
        await axios.post('http://localhost:5000/register', {
          uid: user.uid,
          username,
          email,
          profile_img: user.photoURL, // Optionally store the profile image
          password // Send the password to be hashed on the server
        });

        // Redirect to the login page after verification
        navigate('/login', { state: { emailSent: true, email } });
      } else {
        // Check again after a delay (polling)
        setTimeout(checkEmailVerified, 3000); // Poll every 3 seconds
      }
    };

    // Step 6: Start checking for email verification
    checkEmailVerified();
    
  } catch (error) {
    console.error("Error creating user:", error);
    alert('Error creating user');
  } finally {
    setSubmitting(false);
  }
};

  
  

  return (
    <div className='bg-black h-full sm:w-screen sm:h-screen lg:h-screen lg:w-screen'>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <div className='bg-black min-[320px]:h-full sm:w-full sm:h-fit lg:h-max md:h-fit lg:w-full'>
            <div className='flex justify-center content-center pt-4 '>
              <img src={starx91} className='w-36 h-8 px-5' />
            </div>
            <div className='flex justify-between w-screen min-[320px]:flex-wrap-reverse min-[320px]:place-content-center md:flex-wrap-reverse lg:flex-nowrap'>
              <div className='flex-row min-[320px]:px-12 w-1/3 sm:px-28 mt-10 2xl:my-44 mb-5'>
                <h1 className='text-white text-2xl font-bold'>Get Started.</h1>
                <h2 className='text-white'>Fly Smarter. Start Planning.</h2>

                <button
                  className='flex w-72 px-12 py-2 lg:px-12 lg:py-2 md:py-1 md:px-8 justify-center rounded-lg my-3 min-[320px] h-11 md:w-72 lg:w-72 border-solid border-2 border-zinc-800 hover:bg-zinc-900 hover:text-white gap-2'
                  onClick={signInWithGoogle}
                >
                  <div className='flex justify-center gap-2'>
                    <img src={googleIcon} alt="Google Icon" className='size-7 sm:size-8 lg:size-6 py-1 px-1 lg:px-1 md:px-1 md:size-8' />
                    <h1 className='gap-y-30 md:py-2 lg:py-0 text-zinc-400 lg:text-sm md:text-xs'>Login with Google</h1>
                  </div>
                </button>

                <button
                  className='flex justify-center rounded-lg border-solid border-2 border-zinc-800 hover:bg-zinc-900 hover:text-white px-12 w-72 py-2 my-3 h-11 gap-2 md:py-1 md:px-8 md:w-72 lg:px-12 lg:py-2 lg:w-72'
                  onClick={handleAppleSignIn}
                >
                  <div className='flex justify-center gap-2'>
                    <img src={appleIcon} alt="Apple Icon" className='size-7 sm:size-8 lg:size-6 py-1 px-1 lg:px-1 md:px-1 md:size-8' />
                    <h1 className='gap-y-30 md:py-2 lg:py-0 text-zinc-400 lg:text-sm md:text-xs'>Login with Apple</h1>
                  </div>
                </button>

                <hr className='h-px bg-gray-800 my-2'></hr>
                <Form>
                  <div className='flex flex-col gap-y-2 text-zinc-400'>
                    <label htmlFor="username">Your Username</label>
                    <Field name="username" type="text" placeholder="xyz" className='min-[320px]:h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' />
                    <ErrorMessage name="username" component="div" className='text-red-500' />

                    <label htmlFor="email">Your Email</label>
                    <Field name="email" type="email" placeholder="xyz@domain.com" className='min-[320px]:h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' />
                    <ErrorMessage name="email" component="div" className='text-red-500' />

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" placeholder="At least 8 characters" className='min-[320px]:h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' />
                    <ErrorMessage name="password" component="div" className='text-red-500' />

                    <div className='flex gap-1'>
                      <Field type='checkbox' className='px-2 py-2' name="rememberMe" />
                      <h1 className='text-zinc-500 text-sm'>Remember me.</h1>
                    </div>

                    <button type="submit" className='bg-white text-black rounded-md h-10 w-72 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700' disabled={isSubmitting}>
                      Sign Up
                    </button>
                  </div>
                </Form>

                {verificationMessage && (
                  <div className='text-green-500 mt-4'>
                    {verificationMessage}
                  </div>
                )}

                <div className='flex gap-2 text-sm'>
                  <h1 className='text-zinc-500'>Already have an account? </h1>
                  <Link to="/login" className='text-white'>Login</Link>
                </div>
              </div>

              <div className='container-lg flex place-content-center'>
                <img src={bck} className='size-5/6' />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;
