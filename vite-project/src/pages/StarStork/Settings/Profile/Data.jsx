// import React, { useState } from "react";
// import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline"; // Correct import for v2

// const Data = () => {
//   // State management for editable fields
//   const [mobileNumber, setMobileNumber] = useState("9232324433");
//   const [address, setAddress] = useState("-");
//   const [country , setCountry]=useState("India")
//   const [state , setState]=useState("Karnataka")
  
//   // State for toggling edit mode
//   const [isEditingMobile, setIsEditingMobile] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [isEditingCountry, setIsEditingCountry] = useState(false);
//   const [isEditingState, setIsEditingState] = useState(false);

//   return (
//     <div className="bg-neutral-950 text-white w-full p-4 lg:p-8 flex flex-col items-center">
//       <div className="flex flex-col items-center">
//         <div className="w-20 h-20 bg-neutral-700 rounded-full mb-4"></div>
//         <button className="text-zinc-300 text-xs -mt-2">Change profile picture</button>
//       </div>
//       <div className="w-full lg:w-2/3 mt-8">
//         <h2 className="text-xl text-zinc-200 text-center font-semibold mb-4">
//           Personal Information
//         </h2>
//         <div className="flex-col">
//           <div className="flex gap-4 mb-4">
//             <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md">
//               <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
//                 Name
//               </div>
//               <p className="text-center text-base text-neutral-400 font-semibold">xyz</p>
//             </div>
//             <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md">
//               <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
//                 Date of Birth
//               </div>
//               <p className="text-center text-base text-neutral-400 font-semibold">9 December 2004</p>
//             </div>
//           </div>
//           <div className="flex gap-4 items-center">
//             <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md flex items-center justify-between px-4">
//               <div>
//                 <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
//                   Email Id
//                 </div>
//                 <p className="text-center text-base text-neutral-400 font-semibold">xyz@gmail.com</p>
//               </div>
//             </div>
//             <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md flex items-center justify-between px-4">
//               <div>
//                 <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
//                   Mobile Number
//                 </div>
//                 {isEditingMobile ? (
//                   <input
//                     type="text"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     className="bg-neutral-800 text-neutral-300 w-full text-center"
//                   />
//                 ) : (
//                   <p className="text-center text-base text-neutral-400 font-semibold">
//                     {mobileNumber}
//                   </p>
//                 )}
//               </div>
//               {isEditingMobile ? (
//                 <CheckIcon
//                   className="w-5 h-5 text-green-400 cursor-pointer"
//                   onClick={() => setIsEditingMobile(false)}
//                 />
//               ) : (
//                 <PencilIcon
//                   className="w-5 h-5 text-neutral-400 cursor-pointer"
//                   onClick={() => setIsEditingMobile(true)}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full lg:w-2/3 mt-8">
//         <h2 className="text-xl text-neutral-300 text-center font-semibold mb-4">
//           Address
//         </h2>
//         <div className="flex-col justify-center">
//           <div className="flex gap-4">
//             <div className="bg-neutral-900 h-fit py-1 w-1/2 rounded-md">
//               <div className="text-center font-semibold">Country</div>
//               <p className="text-center text-neutral-400 font-semibold">India</p>
//             </div>
//             <div className="bg-neutral-900 h-fit py-1 w-1/2 rounded-md">
//               <div className="text-center font-semibold">State</div>
//               <p className="text-center text-neutral-400 font-semibold">Maharashtra</p>
//             </div>
//           </div>
//           <div className="flex justify-center mt-4">
//             <div className="bg-neutral-900 h-fit py-1 w-11/12 rounded-md flex items-center justify-between px-4">
//               <div>
//                 <div className="text-center font-semibold">Address</div>
//                 {isEditingAddress ? (
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="bg-neutral-800 text-neutral-300 w-full text-center"
//                   />
//                 ) : (
//                   <p className="text-center text-neutral-400 font-semibold">{address}</p>
//                 )}
//               </div>
//               {isEditingAddress ? (
//                 <CheckIcon
//                   className="w-5 h-5 text-green-400 cursor-pointer"
//                   onClick={() => setIsEditingAddress(false)}
//                 />
//               ) : (
//                 <PencilIcon
//                   className="w-5 h-5 text-neutral-400 cursor-pointer"
//                   onClick={() => setIsEditingAddress(true)}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Data;


import React, { useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline"; // Correct import for v2

const Data = () => {
  // State management for editable fields
  const [mobileNumber, setMobileNumber] = useState("9232324433");
  const [address, setAddress] = useState("-");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");

  // State for toggling edit mode
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const [isEditingState, setIsEditingState] = useState(false);

  return (
    <div className="bg-neutral-950 text-white w-full p-4 lg:p-8 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-neutral-700 rounded-full mb-4"></div>
        <button className="text-zinc-300 text-xs -mt-2">Change profile picture</button>
      </div>
      <div className="w-full lg:w-2/3 mt-8">
        <h2 className="text-xl text-zinc-200 text-center font-semibold mb-4">
          Personal Information
        </h2>
        <div className="flex-col">
          <div className="flex gap-4 mb-4">
            <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md">
              <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
                Name
              </div>
              <p className="text-center text-base text-neutral-400 font-semibold">xyz</p>
            </div>
            <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md">
              <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
                Date of Birth
              </div>
              <p className="text-center text-base text-neutral-400 font-semibold">9 December 2004</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md flex items-center justify-between px-4">
              <div>
                <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
                  Email Id
                </div>
                <p className="text-center text-base text-neutral-400 font-semibold">xyz@gmail.com</p>
              </div>
            </div>
            <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md flex items-center justify-between px-4">
              <div>
                <div className="text-center text-sm text-neutral-300 mb-1 font-semibold">
                  Mobile Number
                </div>
                {isEditingMobile ? (
                  <input
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="bg-neutral-800 text-neutral-300 w-full text-center"
                  />
                ) : (
                  <p className="text-center text-base text-neutral-400 font-semibold">
                    {mobileNumber}
                  </p>
                )}
              </div>
              {isEditingMobile ? (
                <CheckIcon
                  className="w-5 h-5 text-green-400 cursor-pointer"
                  onClick={() => setIsEditingMobile(false)}
                />
              ) : (
                <PencilIcon
                  className="w-5 h-5 text-neutral-400 cursor-pointer"
                  onClick={() => setIsEditingMobile(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 mt-8">
        <h2 className="text-xl text-neutral-300 text-center font-semibold mb-4">
          Address
        </h2>
        <div className="flex-col justify-center">
          <div className="flex gap-4">
            <div className="bg-neutral-900 h-fit py-1 w-1/2 rounded-md flex items-center justify-between px-4">
              <div>
                <div className="text-center font-semibold">Country</div>
                {isEditingCountry ? (
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-neutral-800 text-neutral-300 w-full text-center"
                  />
                ) : (
                  <p className="text-center text-neutral-400 font-semibold">{country}</p>
                )}
              </div>
              {isEditingCountry ? (
                <CheckIcon
                  className="w-5 h-5 text-green-400 cursor-pointer"
                  onClick={() => setIsEditingCountry(false)}
                />
              ) : (
                <PencilIcon
                  className="w-5 h-5 text-neutral-400 cursor-pointer"
                  onClick={() => setIsEditingCountry(true)}
                />
              )}
            </div>
            <div className="bg-neutral-900 h-fit py-1 w-1/2 rounded-md flex items-center justify-between px-4">
              <div>
                <div className="text-center font-semibold">State</div>
                {isEditingState ? (
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-neutral-800 text-neutral-300 w-full text-center"
                  />
                ) : (
                  <p className="text-center text-neutral-400 font-semibold">{state}</p>
                )}
              </div>
              {isEditingState ? (
                <CheckIcon
                  className="w-5 h-5 text-green-400 cursor-pointer"
                  onClick={() => setIsEditingState(false)}
                />
              ) : (
                <PencilIcon
                  className="w-5 h-5 text-neutral-400 cursor-pointer"
                  onClick={() => setIsEditingState(true)}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="bg-neutral-900 h-fit py-1 w-full rounded-md flex items-center justify-between px-4">
              <div>
                <div className="text-center font-semibold">Address</div>
                {isEditingAddress ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-neutral-800 text-neutral-300 w-full text-center"
                  />
                ) : (
                  <p className="text-center text-neutral-400 font-semibold">{address}</p>
                )}
              </div>
              {isEditingAddress ? (
                <CheckIcon
                  className="w-5 h-5 text-green-400 cursor-pointer"
                  onClick={() => setIsEditingAddress(false)}
                />
              ) : (
                <PencilIcon
                  className="w-5 h-5 text-neutral-400 cursor-pointer"
                  onClick={() => setIsEditingAddress(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
