import React, { useState, useEffect } from "react";
import Navbar from "../../../components/ServicesNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useProfile} from "../../../context/ProfileImageContext"
import { IoIosArrowForward } from "react-icons/io";

function EditProfile() {
  const navigate = useNavigate();
  const {setImage} = useProfile();
  const [tempDateOfBirth, setTempDateOfBirth] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    dateOfBirth: "",
    pilotLicense: "",
    phoneNumber: "",
    profileImg: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) {
          throw new Error("No user UID found in local storage.");
        }

        const response = await axios.get(`http://localhost:5000/api/google_login/${uid}`);
        const data = response.data;
        console.log(data);

        setProfile({
          username: data.username || "",
          dateOfBirth: data.dateOfBirth || "",
          pilotLicense: data.pilotLicense || "",
          phoneNumber: data.phoneNumber || "",
          profileImg: data.profile_img || "",
        });
        setTempDateOfBirth(data.dateOfBirth || calculateMinDate());
        console.log(profile.profileImg);
        setImage(profile.profileImg);
      } catch (error) {
        console.error("Error getting user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDateChange = (event) => {
    setTempDateOfBirth(event.target.value);
  };

  const handleSave = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      alert("No user UID found in local storage.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/google_login/${uid}`, {
        dateOfBirth: tempDateOfBirth,
        phoneNumber: profile.phoneNumber,  // Send phoneNumber
        pilotLicense: profile.pilotLicense  // Send pilotLicense
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error saving profile information:", error);
    }
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
    <div className="w-full min-h-screen bg-black">
      <Navbar />
      <div className="h-[calc(100%-48px)] w-full p-4 flex flex-col items-center justify-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
              <img src={profile.profileImg} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          </div>
        </div>
        <form className="w-full max-w-md">
          <div className="text-center font-bold text-xl my-3 text-neutral-300">Personal Information</div>
          <div className="m-1 border-solid border-[2px] border-neutral-800 pl-3 pr-3 py-1 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
            <div className="font-semibold text-sm">Name</div>
            <input
              readOnly
              placeholder={profile.username}
              className="w-full bg-transparent text-sm font-semibold placeholder-neutral-500"
            />
          </div>
          <div className="m-1 border-solid border-[2px] border-neutral-800 pl-3 pr-3 py-1 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
            <div className="font-semibold text-sm">Date of Birth</div>
            <input
              type="date"
              value={tempDateOfBirth}
              onChange={handleDateChange}
              max={calculateMinDate()}
              className="w-full bg-transparent text-sm font-semibold text-neutral-500"
            />
          </div>
          <button className="w-full" onClick={changePhoneNumber}>
            <div className="text-left m-1 flex border-solid border-[2px] border-neutral-800 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
              <div className="flex-grow pl-3 py-1">
                <h1 className="font-semibold text-sm">Phone Number</h1>
                <input
                  readOnly
                  placeholder={profile.phoneNumber}
                  className="w-full bg-transparent text-sm font-semibold text-neutral-500"
                />
              </div>
              <div className="py-5 pr-2">
                <IoIosArrowForward />
              </div>
            </div>
          </button>
          <div className="flex justify-between my-4">
            <button
              onClick={back}
              className="px-4 py-1 w-[40%] rounded-sm font-semibold bg-neutral-300 hover:bg-white transition duration-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1 w-[40%] rounded-sm font-semibold bg-neutral-300 hover:bg-white transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
