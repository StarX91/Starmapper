import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function EditProfile() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [tempImage, setTempImage] = useState(null); // Temporary image state
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [tempDateOfBirth, setTempDateOfBirth] = useState(""); // Temporary date of birth state

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
      setTempImage(storedImage);
    }

    const storedDateOfBirth = localStorage.getItem("dateOfBirth");
    if (storedDateOfBirth) {
      setDateOfBirth(storedDateOfBirth);
      setTempDateOfBirth(storedDateOfBirth);
    } else {
      const minDate = calculateMinDate();
      setDateOfBirth(minDate);
      setTempDateOfBirth(minDate);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setTempImage(result); // Update temporary image state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (event) => {
    setTempDateOfBirth(event.target.value); // Update temporary date of birth state
  };

  const handleSave = () => {
    if (tempImage) {
      setImage(tempImage);
      localStorage.setItem("profileImage", tempImage);
    }
    setDateOfBirth(tempDateOfBirth);
    localStorage.setItem("dateOfBirth", tempDateOfBirth);
  };

  const back = () => {
    navigate("/ss/dashboard");
  };

  const changePhoneNumber = () => {
    navigate("/change-phone-number");
  };

  const calculateMinDate = () => {
    const today = new Date();
    const minDate = new Date(today.setFullYear(today.getFullYear() - 18));
    return minDate.toISOString().split("T")[0];
  };

  return (
    <div className="w-full h-screen bg-black">
      <Navbar />
      <div className="h-[calc(100%-48px)] w-full p-4 flex-col">
        <div className="flex justify-center mb-2">
          <div className="relative">
            {tempImage ? (
              <img src={tempImage} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32 bg-neutral-900 rounded-full flex items-center justify-center">
                <span className="text-neutral-500">No Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <label className="text-xs text-center font-semibold transition text-neutral-600 hover:text-neutral-500 duration-200 cursor-pointer">
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <form>
          <div className="flex justify-center">
            <div className="flex-col flex justify-center px-20 py-4 rounded-lg">
              <div className="text-center font-bold text-xl my-3 transition text-neutral-300 duration-200">
                Personal Information
              </div>
              <div className="m-1 border-solid border-[2px] border-neutral-800 pl-3 pr-20 py-1 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
                <div className="font-semibold text-sm">Name</div>
                <input
                  readOnly
                  placeholder="Atharv Malve"
                  className="px-0 text-sm font-semibold bg-transparent rounded-none placeholder-neutral-500"
                />
              </div>
              <div className="m-1 border-solid border-[2px] border-neutral-800 pl-3 pr-20 py-1 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
                <div className="font-semibold text-sm">Date of Birth</div>
                <input
                  type="date"
                  value={tempDateOfBirth}
                  onChange={handleDateChange}
                  max={calculateMinDate()}
                  className="px-0 text-sm font-semibold bg-transparent rounded-none text-neutral-500 placeholder-neutral-500"
                />
              </div>
              <button className="" onClick={changePhoneNumber}>
                <div className="text-left m-1 flex border-solid border-[2px] border-neutral-800 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200 hover:gap-0.5">
                  <div className="text-left w-11/12 pl-3 py-1">
                    <h1 className="px-0 font-semibold text-sm">Phone Number</h1>
                    <input
                      readOnly
                      placeholder="892392129"
                      className="px-0 text-sm font-semibold bg-transparent rounded-none text-neutral-500 placeholder-neutral-500"
                    />
                  </div>
                  <div className="py-5">
                    <IoIosArrowForward />
                  </div>
                </div>
              </button>
              <div className="flex justify-evenly my-2">
                <button
                  onClick={back}
                  className="px-12 py-1 rounded-sm font-semibold transition bg-neutral-300 hover:bg-white duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-12 py-1 rounded-sm font-semibold transition bg-neutral-300 hover:bg-white duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
