import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import appleIcon from '../../components/assets/apple.png';
import googleIcon from '../../components/assets/google.png';
import bck from "../../components/assets/bck.jpg";
import starx91 from '../../components/assets/starx91.jpg';
//import { ProfileContext } from '../../context/ProfileContext.jsx';
import { auth, googleProvider, appleProvider, signInWithPopup, signInWithEmailAndPassword } from '../../components/firebaseConfig.jsx'; // Adjust the import path as needed

const Login = () => {
  const navigate = useNavigate();
  const { setProfileImg } = useContext(ProfileContext);
  const [message, setMessage] = useState('');

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const profileImgUrl = user.photoURL;
      setProfileImg(profileImgUrl);

      if (user.emailVerified) {
        navigate('/services');
      } else {
        setMessage('Please verify your email before logging in.');
        await auth.signOut();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      const profileImgUrl = user.photoURL;
      setProfileImg(profileImgUrl);

      if (user.emailVerified) {
        navigate('/services');
      } else {
        setMessage('Please verify your email before logging in.');
        await auth.signOut();
      }
    } catch (error) {
      console.error("Apple sign-in error:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        navigate('/services');
      } else {
        setMessage('Please verify your email before logging in.');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Error logging in with email and password:', error);
      alert('Login failed. Please check your email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='bg-black h-full sm:w-screen sm:h-screen lg:h-screen lg:w-screen'>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        <div className='bg-black min-[320px]:h-full sm:w-full sm:h-fit lg:h-max md:h-fit lg:w-full'>
          <div className='flex justify-center content-center pt-4'>
            <img src={starx91} className='w-36 h-8 px-5'/>
          </div>
          <div className='flex max-w-screen min-[320px] flex-wrap-reverse place-content-center md:flex-wrap-reverse lg:flex-nowrap'>
            <div className='flex-row min-[320px] px-12 sm:px-28 mt-10 2xl:mt-44 mb-5'>
              <h1 className='text-white text-2xl font-bold'>Welcome Back!</h1>
              <h2 className='text-white'>Your flights await. Log in and take off.</h2>

              <button
                className='flex w-72 px-12 py-2 lg:px-12 lg:py-2 md:py-1 md:px-8 justify-center rounded-lg my-3 min-[320px] h-11 md:w-72 lg:w-72 border-solid border-2 border-zinc-800 hover:bg-zinc-900 hover:text-white gap-2'
                onClick={signInWithGoogle}
              >
                <div className='flex justify-center gap-2'>
                  <img src={googleIcon} alt="Google Icon" className='size-7 sm:size-8 lg:size-6 py-1 px-1 lg:px-1 md:px-1 md:size-8'/>
                  <h1 className='gap-y-30 md:py-2 lg:py-0 text-zinc-400 lg:text-sm md:text-xs'>Login with Google</h1>
                </div>
              </button>

              <button
                className='flex justify-center rounded-lg border-solid border-2 border-zinc-800 hover:bg-zinc-900 hover:text-white px-12 w-72 py-2 my-3 h-11 gap-2 md:py-1 md:px-8 md:w-72 lg:px-12 lg:py-2 lg:w-72'
                onClick={handleAppleSignIn}
              >
                <div className='flex justify-center gap-2'>
                  <img src={appleIcon} alt="Apple Icon" className='size-7 sm:size-8 lg:size-6 py-1 px-1 lg:px-1 md:px-1 md:size-8'/>
                  <h1 className='gap-y-30 md:py-2 lg:py-0 text-zinc-400 lg:text-sm md:text-xs'>Login with Apple</h1>
                </div>
              </button>

              <Form>
                <div className='flex flex-col gap-y-2 text-zinc-400'>
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" placeholder="xyz" className='min-[320px] h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' />
                  <ErrorMessage name="username" />
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" placeholder="At least 6 characters" className='min-[320px] h-9 md:w-72 lg:w-72 bg-zinc-900 rounded-lg p-3' />
                  <ErrorMessage name="password" />
                  <div className='flex justify-between'>
                    <div className='flex gap-1'>
                      <input type='checkbox' className='px-2 py-2 bg-green-300' />
                      <h1 className='text-zinc-500'>Remember me.</h1>
                    </div>
                    <button type="button" onClick={() => navigate('/forgot-password')} className='text-white text-sm'>Forgot Password?</button>
                  </div>
                  <button type="submit" className='bg-white text-black rounded-md h-10 gap-34 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700'>Login</button>
                </div>
              </Form>
              <div className='flex gap-2 text-sm'>
                <h1 className='text-zinc-500'>Don't have an account? </h1>
                <Link to="/" className='text-white'>Signup</Link>
              </div>
            </div>

            <div className='container-lg flex place-content-center'>
              <img src={bck} className='size-5/6'/>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default Login;
