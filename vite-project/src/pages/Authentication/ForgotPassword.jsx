import React, { useState } from "react";
import { sendPasswordResetEmail, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../components/firebaseConfig"; // Adjust the import path
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import bck from "../../components/assets/bck.jpg";
import starx91 from '../../components/assets/starx91.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValid(validatePhoneNumber(value));
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const validatePhoneNumber = (phone) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phone);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: `${window.location.origin}/reset-password`, // Your custom URL
      handleCodeInApp: true,
    };
  
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage(error.message);
    }
  };
  
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    }, auth);
  };

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setOtpSent(true);
        setMessage("OTP sent to your phone number!");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    auth.signInWithCredential(credential)
      .then((result) => {
        setMessage("Phone number verified successfully!");
        // Redirect or allow password reset
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className='bg-black  h-full sm:w-screen sm:h-screen   lg:h-screen lg:w-screen'>
      <div className='flex justify-center content-center pt-4 '>
        <img src={starx91} className='w-36 h-8 px-5 '/>
      </div>  
      <div className="bg-black flex max-w-screen min-[320px]:flex-wrap-reverse min-[320px]:place-content-center md:flex-wrap-reverse lg:flex-nowrap ">
        <div className="flex-row min-[320px]:px-12  sm:px-28 md:mt-24 min[320px]:mt-10 mb-5">
          <h1 className="text-white text-2xl font-bold">Forgot Password?</h1>
          <h2 className="text-white ">Check your email for reset link.</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleEmailSubmit}>
            <div className='flex flex-col gap-y-2 text-zinc-400'>
              <label htmlFor='email'>Your Email</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                required
                className='min-[320px]:h-9 md:w-48 lg:w-72 bg-zinc-900 rounded-lg p-3'
              />
              <button
                type='submit'
                className='bg-white text-black rounded-md h-10 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700'
              >
                Send Reset Email
              </button>
            </div>
          </form>

          <br />
          <p className='text-[#A19A9A]'>or</p>
          <br />

          <form onSubmit={handlePhoneSubmit}>
            <div className='flex flex-col gap-y-2 text-zinc-400'>
              <label htmlFor='phone'>Your Phone Number</label>
              <PhoneInput
                type='text'
                country={"US"}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{ required: true }}
                className='min-[320px]:h-9 md:w-48 lg:w-72 bg-zinc-900 rounded-lg p-3'
              />
              {!valid && <p>Please enter a valid 10-digit phone number</p>}
              <button
                type='submit'
                className='bg-white text-black rounded-md h-10 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700'
                disabled={!valid}
              >
                Send OTP
              </button>
            </div>
          </form>

          {otpSent && (
            <form onSubmit={handleOtpSubmit}>
              <div className='flex flex-col gap-y-2 text-zinc-400'>
                <label htmlFor='otp'>Enter OTP</label>
                <input
                  type='text'
                  id='otp'
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  className='min-[320px]:h-9 md:w-48 lg:w-72 bg-zinc-900 rounded-lg p-3'
                />
                <button
                  type='submit'
                  className='bg-white text-black rounded-md h-10 font-bold hover:bg-zinc-200 border-solid border-2 hover:border-zinc-700'
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}
          <div id="recaptcha-container"></div>
        </div>
        <div className='flex place-content-center w-7/12 p-5'>
          <img src={bck} className='lg:w-full h-5/12' alt='Background' />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
