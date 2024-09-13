/*import React, { useState } from "react";

const Data = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Function to check password strength
  const validatePassword = (password) => {
    const lengthRequirement = /.{8,}/; // At least 8 characters
    const uppercaseRequirement = /[A-Z]/; // At least one uppercase letter
    const lowercaseRequirement = /[a-z]/; // At least one lowercase letter
    const numberRequirement = /[0-9]/; // At least one number
    const specialCharRequirement = /[!@#$%^&*]/; // At least one special character

    if (!lengthRequirement.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!uppercaseRequirement.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!lowercaseRequirement.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!numberRequirement.test(password)) {
      return "Password must include at least one number.";
    }
    if (!specialCharRequirement.test(password)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    setError(validationError);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-2">
      <h1 className="mt-24 text-center text-2xl text-neutral-500 font-bold">
        Set Password
      </h1>
      <span className="font-semibold text-center text-md text-neutral-600 mt-4">
        You have not signed up using email and password. Please set a password
        for your<br></br> account.
      </span>

      <div className="mb-4 mt-4">
        <h1 className="text-neutral-500 text-lg font-semibold text-center">
          New Password
        </h1>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          className="bg-neutral-900 ml-4 mt-2 border border-neutral-500 rounded-md px-8"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="mb-4 mt-4">
        <h1 className="text-neutral-500 text-lg font-semibold text-center">
          Confirm Password
        </h1>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          className="bg-neutral-900 mt-2 border border-neutral-500 rounded-md px-8"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPassword && confirmPassword !== password && (
          <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
        )}
      </div>

      <div className="mb-4">
        <label className="text-neutral-500 text-sm">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
            className="mr-2"
          />
          Show Password
        </label>
      </div>

      <button
        className="mt-4 bg-neutral-400 text-neutral-900 font-semibold rounded-md hover:bg-neutral-900 text-center text-md px-8 p-1 hover:text-neutral-400 hover:border"
        disabled={error || confirmPassword !== password}
      >
        Save
      </button>
    </div>
  );
};

export default Data;
*/
import React, { useState } from "react";
// You can import icons from a library like react-icons
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Example using react-icons

const Data = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Function to check password strength
  const validatePassword = (password) => {
    const lengthRequirement = /.{8,}/; // At least 8 characters
    const uppercaseRequirement = /[A-Z]/; // At least one uppercase letter
    const lowercaseRequirement = /[a-z]/; // At least one lowercase letter
    const numberRequirement = /[0-9]/; // At least one number
    const specialCharRequirement = /[!@#$%^&*]/; // At least one special character

    if (!lengthRequirement.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!uppercaseRequirement.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!lowercaseRequirement.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!numberRequirement.test(password)) {
      return "Password must include at least one number.";
    }
    if (!specialCharRequirement.test(password)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    setError(validationError);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-2">
      <h1 className="mt-24 text-center text-2xl text-neutral-500 font-bold">
        Set Password
      </h1>
      <span className="font-semibold text-center text-md text-neutral-600 mt-4">
        You have not signed up using email and password. Please set a password
        for your<br></br> account.
      </span>

      <div className="mb-4 mt-4 relative">
        <h1 className="text-neutral-500 text-lg font-semibold text-center">
          New Password
        </h1>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          className="bg-neutral-900 mt-2 border border-neutral-500 rounded-md p-1 px-8 pr-10" // Padding for icon
          value={password}
          onChange={handlePasswordChange}
        />

        {/* This will reserve space for the error message */}
        <div className="h-5 mt-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Eye icon */}
        <span
          className="absolute right-6 top-11 cursor-pointer text-neutral-500" // Position for icon
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
          {/* Toggle between eye open/closed */}
        </span>
      </div>

      <div className="mb-4 mt-4 relative">
        <h1 className="text-neutral-500 text-lg font-semibold text-center">
          Confirm Password
        </h1>
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          className="bg-neutral-900 mt-2 border border-neutral-500 rounded-md px-8 pr-10 p-1" // Padding for icon
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPassword && confirmPassword !== password && (
          <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
        )}

        {/* Eye icon */}
        <span
          className="absolute right-6 top-11 cursor-pointer text-neutral-500" // Position for icon
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
          {/* Toggle between eye open/closed */}
        </span>
      </div>

      <button
        className="mt-4 bg-neutral-400 text-neutral-900 font-semibold rounded-md hover:bg-neutral-900 text-center text-md px-8 p-1 hover:text-neutral-400 hover:border"
        disabled={error || confirmPassword !== password}
      >
        Save
      </button>
    </div>
  );
};

export default Data;
