import React, { useState, useEffect } from "react";
import Navbar from "../../../components/ServicesNavbar";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseclient";
import { IoIosArrowForward } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

function EditProfile() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [tempImage, setTempImage] = useState(null); // Temporary image state
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [tempDateOfBirth, setTempDateOfBirth] = useState(""); // Temporary date of birth state
  const [deleteImageFlag, setDeleteImageFlag] = useState(false); // Flag for image deletion
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility

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
        setDeleteImageFlag(false); // Reset delete flag if a new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (event) => {
    setTempDateOfBirth(event.target.value); // Update temporary date of birth state
  };

  const handleSave = () => {
    if (deleteImageFlag) {
      setImage(null);
      localStorage.removeItem("profileImage");
    } else if (tempImage) {
      setImage(tempImage);
      localStorage.setItem("profileImage", tempImage);
    }
    setDateOfBirth(tempDateOfBirth);
    localStorage.setItem("dateOfBirth", tempDateOfBirth);
  };

  const handleDeleteImage = () => {
    setTempImage(null); // Clear the temporary image
    setDeleteImageFlag(true); // Set the delete flag to true
  };

  const [profile, setProfile] = useState({
    username: "",
    dateOfBirth: "",
    pilotLicense: "",
    phoneNumber: "",
    profileImg: "",
  });

  const fetchUserProfile = async () => {
    try {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        throw new Error("No user UID found in local storage.");
      }

      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("uid", uid)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile. Please try again later.");
      } else {
        setProfile({
          username: data.username || "",
          dateOfBirth: data.date_of_birth || "",
          pilotLicense: data.pilot_license || "",
          phoneNumber: data.phone_number || "",
          profileImg: data.profile_img || "",
        });
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
            {tempImage ? (
              <img
                src={tempImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-neutral-900 rounded-full flex items-center justify-center">
                <span className="text-neutral-500">No Image</span>
              </div>
            )}
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
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleDeleteImage}
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
          <div className="text-center font-bold text-xl my-3 text-neutral-300">
            Personal Information
          </div>
          <div className="m-1 border-solid border-[2px] border-neutral-800 pl-3 pr-3 py-1 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
            <div className="font-semibold text-sm">Name</div>
            <input
              readOnly
              placeholder="Atharv Malve"
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
            ></input>
          </div>
          <button className="w-full" onClick={changePhoneNumber}>
            <div className="text-left m-1 flex border-solid border-[2px] border-neutral-800 rounded-lg text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200">
              <div className="flex-grow pl-3 py-1">
                <h1 className="font-semibold text-sm">Phone Number</h1>
                <input
                  readOnly
                  placeholder="892392129"
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
