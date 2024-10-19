import { initializeApp } from 'firebase/app';
import { getAuth, applyActionCode, GoogleAuthProvider, OAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, signOut, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA2-HBSNOVt4-Rw4CsTOX9VSp9JyFJJakk",
  authDomain: "starx91-2437f.firebaseapp.com",
  projectId: "starx91-2437f",
  storageBucket: "starx91-2437f.appspot.com",
  messagingSenderId: "1084348214254",
  appId: "1:1084348214254:web:28acc082f364debd75bcff",
  measurementId: "G-CQMY64K6PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// auth.languageCode = 'it';



const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// export { auth, googleProvider, appleProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, signOut, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset };
export {auth, applyActionCode, googleProvider,appleProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset}