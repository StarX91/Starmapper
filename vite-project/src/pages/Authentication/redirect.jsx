import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth, applyActionCode } from "../../components/firebaseConfig"; // Import Firebase auth methods
import axios from 'axios';

const Redirect = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [error, setError] = useState(""); // State for error messages

  // Function to parse URL parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      mode: params.get("mode"), // Get the mode parameter
      oobCode: params.get("oobCode"), // Get the oobCode parameter for email verification
    };
  };

  const handleNavigation = async () => {
    const { mode, oobCode } = getQueryParams(); // Get the mode and oobCode from URL
  
    const email = auth.currentUser.email;
    console.log(email);
    const uid = auth.currentUser.uid;
    console.log(uid);
    if (mode === "verifyEmail" && oobCode) {
      try {
        await applyActionCode(auth, oobCode);
        alert("Email verification successful! You can now log in.");
        console.log(uid);
        try{
            await axios.post('http://localhost:5000/register/verify', {
                uid, // The user's UID
              });
        }
        catch(error){
            console.error(error);
        }
        navigate("/login"); // Navigate to login page after verification
      } catch (error) {
        console.error("Error verifying email:", error);
        setError("There was an error verifying your email. Please try again.");
      }
    } else if (mode === "resetPassword" && oobCode) {
      navigate(`/reset-password?oobCode=${oobCode}&email=${email}`); // Navigate to reset password page
    } else {
      navigate("/"); // Default navigation
    }
  };
  

  // Inline styles
  const containerStyle = {
    backgroundColor: "white", // White background
    color: "black", // Black text color
    display: "flex", // Flexbox for centering
    flexDirection: "column", // Column layout
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    height: "100vh", // Full viewport height
    fontFamily: "Arial, sans-serif", // Optional: Font styling
  };

  const buttonStyle = {
    padding: "10px 20px", // Button padding
    fontSize: "16px", // Button font size
    cursor: "pointer", // Pointer cursor on hover
    border: "2px solid black", // Black border
    backgroundColor: "white", // White background for button
    color: "black", // Black text for button
    transition: "background-color 0.3s ease", // Smooth background transition
  };

  const buttonHoverStyle = {
    backgroundColor: "black", // Change background to black on hover
    color: "white", // Change text to white on hover
  };

  // State to manage button hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <h1>Redirect Page</h1>
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error messages */}
      <button
        style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
        onMouseEnter={() => setIsHovered(true)} // Set hover state
        onMouseLeave={() => setIsHovered(false)} // Reset hover state
        onClick={handleNavigation}
      >
        Navigate
      </button>
    </div>
  );
};

export default Redirect;
