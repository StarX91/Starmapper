import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import appleIcon from '../../components/assets/apple.png';
import googleIcon from '../../components/assets/google.png';
import bck from "../../components/assets/bck.jpg";
import { useGoogleLogin } from 'react-google-login';
import starx91 from '../../components/assets/starx91.jpg';
import { ProfileContext } from '../../context/ProfileContext.jsx';
import { supabase } from '../../supabaseclient'; 
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing

const clientId = "261778488059-r3p7jn1uctichj37qi3kq21j1fghclns.apps.googleusercontent.com";

const Register = () => {
  const navigate = useNavigate();
  const { setProfileImg } = useContext(ProfileContext); // Access setProfileImg from ProfileContext

  const onSuccess = async (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    const profileImgUrl = res.profileObj.imageUrl;
    console.log("Profile Image URL: ", profileImgUrl);
    setProfileImg(profileImgUrl); // Update profileImg in ProfileContext

    // Insert email into Supabase
    const { email } = res.profileObj;
    const { data, error } = await supabase
      .from('login')
      .insert([
        { email }
      ]);

    if (error) {
      console.error('Error inserting Google user email:', error);
    } else {
      console.log('Google user email inserted:', data);
    }

    navigate('/services');
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  const { signIn } = useGoogleLogin({
    clientId,
    onSuccess,
    onFailure,
    cookiePolicy: 'single_host_origin',
  });


  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, email, password } = values;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
    // Insert hashed password into Supabase
    const { data, error } = await supabase
      .from('Register')
      .insert([
        { username, email, password_hash: hashedPassword } // Store hashedPassword instead of plain password
      ]);
  
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      console.log('Data inserted:', data);
      navigate('/services');
    }
    setSubmitting(false);
  };
  

  return (
    <div className=' bg-black w-full max-h-full min-h-screen'>
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
          <div className='bg-black min-[320px]:h-full sm:w-full sm:h-screen lg:h-full lg:w-full'>
            <div className='flex justify-center content-center pt-4 '>
            <img src={starx91} className='w-36 h-8 px-5 '/>

            </div>
            <div className='  flex justify-between w-screen min-[320px]:flex-wrap-reverse min-[320px]:place-content-center md:flex-wrap-reverse lg:flex-nowrap '>
              <div className='flex-row min-[320px]:px-12  sm:px-28 mt-10 2xl:my-48 mb-5 '>
                <h1 className='text-white text-2xl font-bold'>Get Started.</h1>
                <h2 className='text-white'>Fly Smarter. Start Planning.</h2>

                <button
                  className='flex min-[320px]:px-12 py-2 justify-center rounded-lg my-3 min-[320px]:h-11 md:w-48 lg:w-72 border-solid border-2 border-zinc-800 hover:bg-zinc-900 hover:text-white gap-2'
                  onClick={signIn}
                >
                  <div className='flex justify-center gap-2'>
                    <img src={googleIcon} alt="Google Icon" className='w-1/12 h-1/12 py-1'/>
                    <h1 className='gap-y-30 text-zinc-400 text-sm'>Login with Google</h1>
                  </div>
                </button>

                <button className='flex min-[320px]:px-12 py-2  justify-center rounded-lg my-3 min-[320px]:h-11 md:w-48 lg:w-72 border-solid border-2 border-zinc-800  hover:bg-zinc-900 hover:text-white gap-2'>
                  <div className='flex justify-center gap-2'>
                    <img src={appleIcon} alt="Apple Icon" className='w-1/12 h-1/12 py-1'/>
                    <h1 className='gap-y-30 text-zinc-400 text-sm'>Login with Apple</h1>
                  </div>
                </button>

                <hr className='h-px bg-gray-800 my-2'></hr>
                <Form>
                  <div className='flex flex-col gap-y-2  text-zinc-400'>
                    <label htmlFor="username">Your Username</label>
                    <Field name="username" type="text" placeholder="xyz" className=' min-[320px]:h-9 md:w-48 lg:w-72 bg-zinc-900 rounded-lg  p-3 ' />
                    <ErrorMessage name="username"/>

                    <label htmlFor="email">Your Email</label>
                    <Field name="email" type="email" placeholder="xyz@domain.com" className='  min-[320px]:h-9 md:w-48 lg:w-72 bg-zinc-900 rounded-lg p-3 '/>
                    <ErrorMessage name="email" />

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" placeholder="At least 8 characters" className='  min-[320px]:h-9 md:w-48 lg:w-72 bg-zinc-900 rounded-lg p-3' />
                    <ErrorMessage name="password" />

                    <div className='flex gap-1'>
                      <input type='checkbox' className='px-2 py-2 '></input>
                      <h1 className='text-zinc-500 text-sm'>Remember me.</h1>
                    </div>

                    <button type="submit" className='bg-white text-black rounded-md h-10 gap-34 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700' disabled={isSubmitting}>
                      Sign Up
                    </button>
                  </div>
                </Form>

                <div className='flex gap-2 text-sm'>
                  <h1 className='text-zinc-500'>Already have an account? </h1>
                  <Link to="/login" className='text-white'>Login</Link>
                </div>
              </div>

              <div className='flex  place-content-center w-7/12 2xl:w-7/12 p-5'>
                <img src={bck} className='lg:w-full  h-5/12 2xl:h-8/12'/>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;
