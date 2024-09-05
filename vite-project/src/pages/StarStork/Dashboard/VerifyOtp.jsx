// import React, { useState } from "react";
// import { auth } from "../../../components/firebaseConfig";

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState("");

//   const onVerifyOtp = (e) => {
//     e.preventDefault();

//     window.confirmationResult.confirm(otp)
//       .then((result) => {
//         // User signed in successfully
//         alert("Phone number verified!");
//       }).catch((error) => {
//         console.error("Error during verification", error);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={onVerifyOtp}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <button type="submit">Verify OTP</button>
//       </form>
//     </div>
//   );
// };

// export default VerifyOtp;
