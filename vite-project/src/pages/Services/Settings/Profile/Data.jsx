/*import React from "react";

const Data = () => {
  return (
    <div className="bg-neutral-900 text-white w-full p-4 lg:p-8 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-neutral-700 rounded-full mb-4"></div>
        <button className="text-zinc-300 text-xs -mt-2">Change profile picture</button>
      </div>
      <div className="w-full lg:w-2/3 mt-8">
        <h2 className="text-xl text-zinc-200 text-center font-semibold mb-4">
          Personal Information
        </h2>
        <div className="flex-col ">
          <div className="flex gap-4 mb-4">
            <div className="bg-neutral-800  h-fit py-1 w-1/2 rounded-md ">
              <div  className=" text-center font-semibold">
                Name
              </div>
              <p className="text-center text-zinc-400 font-semibold">xyz</p>
            </div>
              <div className="bg-neutral-800  h-fit py-1 w-1/2 rounded-md ">
                <div  className=" text-center font-semibold">
                  Date of Birth
                </div>
                <p className="text-center text-zinc-400 font-semibold">9 december 2004</p>
              </div>
          </div>
          <div className="flex gap-4">
              <div className="bg-neutral-800  h-fit py-1 w-1/2 rounded-md ">
                <div  className=" text-center font-semibold">
                  Email Id
                </div>
                <p className="text-center text-zinc-400 font-semibold">xyz@gmail.com</p>
              </div>
                <div className="bg-neutral-800  h-fit py-1 w-1/2 rounded-md ">
                  <div  className=" text-center font-semibold">
                    Mobile Number
                  </div>
                  <p className="text-center text-zinc-400 font-semibold">9232324433</p>
              </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 mt-8">
        <h2 className="text-xl text-neutral-200 text-center font-semibold mb-4">
          Address
        </h2>
        <div className="flex-col justify-center">
          <div className="flex gap-4">
              <div className="bg-neutral-800  h-fit py-1 w-1/2 rounded-md ">
                <div  className=" text-center font-semibold">
                  Country
                </div>
                <p className="text-center text-neutral-400 font-semibold">India</p>
              </div>
                <div className="bg-neutral-800  h-fit py-1 w-1/2 rounded-md ">
                  <div  className=" text-center font-semibold">
                    State
                  </div>
                  <p className="text-center text-neutral-400 font-semibold">Maharashtra</p>
              </div>
          </div>
          <div className="flex justify-center mt-4">
              <div className="bg-neutral-800  h-fit py-1 w-11/12 rounded-md ">
                      <div  className=" text-center font-semibold">
                        Address
                      </div>
                      <p className="text-center text-neutral-400 font-semibold">-</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data; */

// import React,{useState,useEffect} from "react";
// import axios from "axios";
// const Data = () => {

//   const [profile, setProfile] = useState({
//     username: "",
//     dateOfBirth: "",
//     pilotLicense: "",
//     phoneNumber: "",
//     profileImg: "",
//   });

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const uid = localStorage.getItem("uid");
//         if (!uid) {
//           throw new Error("No user UID found in local storage.");
//         }

//         const response = await axios.get(`http://localhost:5000/api/google_login/${uid}`);
//         const data = response.data;

//         setProfile({
//           username: data.username || "",
//           profileImg: data.profile_img || "",
//           email: data.email || "",
//           image: data.image || ""
//         });
//       } catch (error) {
//         console.error("Error getting user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);
//   return (
//     <div className="bg-neutral-900 text-white w-full p-4 lg:p-8 flex flex-col items-center">
//       <div className="flex flex-col items-center">
//         <div className="w-20 h-20 bg-neutral-700 rounded-full mb-4">
//           {profile.image ? <img
//             src={`data:image/jpeg;base64,${profile.image}`}
//             alt="Profile"
//             className="w-full h-full rounded-full object-cover"
//           /> : <img
//           src={profile.profileImg}
//           alt="Profile"
//           className="w-full h-full rounded-full object-cover"
//         />}
//         </div>
//         <button className="text-zinc-300 text-xs lg:text-sm -mt-2">
//           Change profile picture
//         </button>
//       </div>
//       <div className="w-full lg:w-3/4 xl:w-2/3 mt-8 mx-auto">
//         <h2 className="text-xl text-zinc-200 text-center font-semibold mb-4">
//           Personal Information
//         </h2>
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
//               <div className="font-semibold">Name</div>
//               <input 
//                   readOnly
//                   placeholder={profile.username}
//                   className="w-full bg-transparent text-zinc-400 font-semibold"
//               />
//             </div>
//             <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
//               <div className="font-semibold">Date of Birth</div>
//               <p className="text-zinc-400 font-semibold">9 December 2004</p>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
//               <div className="font-semibold">Email Id</div>
//               <input
//                   readOnly
//                   placeholder={profile.email}
//                   className="w-full bg-transparent text-zinc-400 font-semibold"
//               />
//             </div>
//             <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
//               <div className="font-semibold">Mobile Number</div>
//               <p className="text-zinc-400 font-semibold">9232324433</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full lg:w-3/4 xl:w-2/3 mt-8 mx-auto">
//         <h2 className="text-xl text-neutral-200 text-center font-semibold mb-4">
//           Address
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
//             <div className="font-semibold">Country</div>
//             <p className="text-neutral-400 font-semibold">India</p>
//           </div>
//           <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
//             <div className="font-semibold">State</div>
//             <p className="text-neutral-400 font-semibold">Maharashtra</p>
//           </div>
//         </div>
//         <div className="flex justify-center mt-4">
//           <div className="bg-neutral-800 py-2 px-3 w-full rounded-md text-center">
//             <div className="font-semibold">Address</div>
//             <p className="text-neutral-400 font-semibold">-</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Data;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";

const Data = () => {
  const [profile, setProfile] = useState({
    username: "Nirupam",
    dateOfBirth: "9 December 2004", // Default DOB
    pilotLicense: "",
    phoneNumber: "9232324433", // Default Phone
    profileImg: "",
    email: "test@gmail.com",
    country: "India", // Default Country
    state: "Maharashtra", // Default State
    address: "-" // Default Address
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);



  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) {
          throw new Error("No user UID found in local storage.");
        }

        const response = await axios.get(`http://localhost:5000/api/google_login/${uid}`);
        const data = response.data;

        setProfile({
          username: data.username || "",
          profileImg: data.profile_img || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "9232324433", // Replace with actual phone number
          dateOfBirth: data.date_of_birth || "9 December 2004", // Replace with actual DOB
          country: data.country || "India",
          state: data.state || "Maharashtra",
          address: data.address || "-"
        });
        setEditedProfile({
          username: data.username,
          profileImg: data.profile_img,
          email: data.email,
          phoneNumber: data.phone_number,
          dateOfBirth: data.date_of_birth,
          country: data.country,
          state: data.state,
          address: data.address
        });
      } catch (error) {
        console.error("Error getting user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange = (newDate) => {
    setEditedProfile((prev) => ({
      ...prev,
      dateOfBirth: newDate,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // const uid = localStorage.getItem("uid");

      // // Log the editedProfile and state before sending request
      // console.log("Edited Profile before saving:", editedProfile);

      // // Send the updated profile to the server
      // await axios.put(`http://localhost:5000/api/google_login/${uid}`, editedProfile);

      // If successful, update the profile state
      setProfile(editedProfile);
      console.log("Profile updated successfully:", editedProfile);

      setIsEditing(false); // Set editing mode back to false to switch back to view mode
      console.log("Edit mode set to false:", isEditing);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="bg-neutral-900 text-white w-full p-4 lg:p-8 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-neutral-700 rounded-full mb-4">
          {profile.profileImg ? (
            <img
              src={profile.profileImg}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <img
              src={profile.profileImg}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <button className="text-zinc-300 text-xs lg:text-sm -mt-2">
          Change profile picture
        </button>
      </div>

      <div className="w-full lg:w-3/4 xl:w-2/3 mt-8 mx-auto">
        <h2 className="text-xl text-zinc-200 text-center font-semibold mb-4">
          Personal Information
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
              <div className="font-semibold">Name</div>
              
                <p className="text-zinc-400 font-semibold">{profile.username}</p>
            
            </div>
            <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
              <div className="font-semibold">Date of Birth</div>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full bg-transparent text-zinc-400 font-semibold"
                />
              ) : (
                <p className="text-zinc-400 font-semibold">{profile.dateOfBirth}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
              <div className="font-semibold">Email Id</div>
             
                <p className="text-zinc-400 font-semibold">{profile.email}</p>
            
            </div>
            <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
              <div className="font-semibold">Mobile Number</div>
              
                <p className="text-zinc-400 font-semibold">{profile.phoneNumber}</p>
             
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/4 xl:w-2/3 mt-8 mx-auto">
        <h2 className="text-xl text-neutral-200 text-center font-semibold mb-4">
          Address
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
            <div className="font-semibold">Country</div>
           
              <p className="text-neutral-400 font-semibold">{profile.country}</p>
           
          </div>
          <div className="bg-neutral-800 py-2 px-3 w-full sm:w-1/2 rounded-md text-center">
            <div className="font-semibold">State</div>
            {isEditing ? (
              <input
                name="state"
                value={editedProfile.state}
                onChange={handleInputChange}
                className="w-full bg-transparent text-zinc-400 font-semibold"
              />
            ) : (
              <p className="text-neutral-400 font-semibold">{profile.state}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="bg-neutral-800 py-2 px-3 w-full rounded-md text-center">
            <div className="font-semibold">Address</div>
            {isEditing ? (
              <input
                name="address"
                value={editedProfile.address}
                onChange={handleInputChange}
                className="w-full bg-transparent text-zinc-400 font-semibold"
              />
            ) : (
              <p className="text-neutral-400 font-semibold">{profile.address}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {isEditing ? (
          <button
            onClick={handleSaveChanges}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            ✓ Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            ✎ Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Data;
