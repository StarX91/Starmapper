import React from "react";

const Data = () => {
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
        <div className="flex-col ">
          <div className="flex gap-4 mb-4">
            <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md ">
              <div  className=" text-center text-sm text-neutral-300 mb-1  font-semibold">
                Name
              </div>
              <p className="text-center text-base text-neutral-400 font-semibold">xyz</p>
            </div>
              <div className="bg-neutral-900 text-sm  h-fit py-1 w-1/2 rounded-md ">
                <div  className=" text-center text-sm text-neutral-300 mb-1  font-semibold">
                  Date of Birth
                </div>
                <p className="text-center text-base text-neutral-400 font-semibold">9 december 2004</p>
              </div>
          </div>
          <div className="flex gap-4">
              <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md ">
                <div  className=" text-center text-sm text-neutral-300 mb-1 font-semibold">
                  Email Id
                </div>
                <p className="text-center text-base text-neutral-400 font-semibold">xyz@gmail.com</p>
              </div>
                <div className="bg-neutral-900 text-sm h-fit py-1 w-1/2 rounded-md ">
                  <div  className=" text-center text-sm text-neutral-300 mb-1 font-semibold">
                    Mobile Number
                  </div>
                  <p className="text-center text-base text-neutral-400 font-semibold">9232324433</p>
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
              <div className="bg-neutral-900  h-fit py-1 w-1/2 rounded-md ">
                <div  className=" text-center font-semibold">
                  Country
                </div>
                <p className="text-center text-neutral-400 font-semibold">India</p>
              </div>
                <div className="bg-neutral-900  h-fit py-1 w-1/2 rounded-md ">
                  <div  className=" text-center font-semibold">
                    State
                  </div>
                  <p className="text-center text-neutral-400 font-semibold">Maharashtra</p>
              </div>
          </div>
          <div className="flex justify-center mt-4">
              <div className="bg-neutral-900  h-fit py-1 w-11/12 rounded-md ">
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

export default Data;
