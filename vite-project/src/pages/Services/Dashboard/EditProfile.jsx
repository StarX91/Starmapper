import React, { useState, useEffect } from "react";
import Navbar from "../../../components/ServicesNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import {useProfile} from "../../../context/ProfileImageContext"
import { IoIosArrowForward } from "react-icons/io";

function EditProfile() {
  const navigate = useNavigate();
  const {setImage} = useProfile();
  const {image} = useProfile();
  const [preview, setPreview] = useState(null);
  const [encodedImage, setEncodedImage] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tempDateOfBirth, setTempDateOfBirth] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    dateOfBirth: "",
    pilotLicense: "",
    phoneNumber: "",
    profileImg: "",
    image:"",
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
          image: data.image|| "",
        });
        setTempDateOfBirth(data.dateOfBirth || calculateMinDate());
      } catch (error) {
        console.error("Error getting user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDateChange = (event) => {
    setTempDateOfBirth(event.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Encode image to Base64
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const base64 = fileReader.result.split(",")[1]; // Get the Base64 part
        setEncodedImage(base64);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      alert("No user UID found in local storage.");
      return;
    }
    if(!encodedImage){
      alert("no file selected");
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/google_login/${uid}`, {
        image : encodedImage,
      });
      setImage(encodedImage);
      console.log("image uploaded successfully",encodedImage);
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
  console.log(encodedImage);
  console.log(profile.image);
  return (
    <div className="w-full min-h-screen bg-black">
      <Navbar />
      <img src={profile.image} alt="" />
      <div className="h-[calc(100%-48px)] w-full p-4 flex flex-col items-center justify-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
              {profile.image ? 
              <img src={`data:image/jpeg;base64,${profile.image}`} alt="Profile" className="w-32 h-32 rounded-full object-cover" /> :
              <img src={profile.profileImg} alt="Profile" className="w-32 h-32 rounded-full object-cover" />}
              <div className="absolute bottom-0 right-0">
              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="bg-neutral-900 p-1 rounded-full shadow-md"
              >
              <FiEdit className="size-5 text-neutral-600" />
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-40 bg-neutral-900 rounded-md shadow-lg z-10">
                  <label className="block text-left text-neutral-700 font-semibold p-2 hover:bg-neutral-950 cursor-pointer">
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      onClick={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    className="block text-left p-2 w-full text-neutral-700 font-semibold hover:bg-neutral-950 cursor-pointer"
                  >
                    {/* <MdOutlineDelete className="inline ml-2 text-red-900"/> */}
                    Delete Picture
                  </button>
                </div>
              )}
            </div>
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
