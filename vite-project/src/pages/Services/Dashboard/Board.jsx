import React from "react";
import Navbar from "../../../components/ServicesNavbar";
import { Link } from "react-router-dom";
import StarStork from "../../../assets/starstork.svg";
import Starmarg from "../../../assets/Starmarg.svg";
import Starexplorer from "../../../assets/starxexplorer.svg";
import logoone from "../../../assets/Exclude.png";
import logotwo from "../../../assets/vector.png";
import logothree from "../../../assets/Group 262.png";
import Star from "../../../assets/star.svg";

const Board = () => {
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <div className="flex bg-black  w-full h-fit justify-center">
        <div
          className=" rounded-2xl justify-center
          w-full  mx-4  mt-8  mb-12 p-4
           md:mx-18 md:mt-4 md:mb-5
          min-[1440px]:my-16  min-[1440px]:mx-36
          "
        >
          <div className="flex justify-center items-center ">
            <img src={Star} className="" />
          </div>
          <div
            className="text-center text-neutral-300 mt-2
            min-[1440px]:mt-4
            2xl:mt-12"
          >
            <p
              className="text-xl font-semibold 
              md:text-4xl"
            >
              Welcome to{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-600 to-red-800">
                StarMapper
              </span>
            </p>
            <p
              className="text-xs md:text-sm pt-2 px-36 md:pt-3 text-neutral-300 font-semibold
              min-[1440px]:pt-4 min-[1440px]:text-lg min-[1440px]:px-56
              2xl:px-96"
            >
              Star-Mapper is a SaaS platform offering multiple services. Each
              service is uniquely designed with the highest security and
              simplicity to address the needs of the drone ecosystem
            </p>
          </div>
          {/* <div className="space-y-4 md:space-y-8 mt-8 md:mt-12">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row bg-zinc-800 w-full md:w-3/5 mx-auto rounded-3xl p-4 items-center"
              >
                <div className="flex-shrink-0">
                  <img
                    src=""
                    alt="img"
                    className="w-16 h-16 md:w-20 md:h-20 bg-zinc-700 rounded-full"
                  />
                </div>
                <div className="flex flex-col flex-grow md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <div className="text-white font-bold text-lg">
                    Software Name
                  </div>
                  <div className="text-white text-sm md:text-base mt-2">
                    Plan missions, track flights, stream videos on cloud and get
                    detailed logs for useful insights. Sync your Software
                    projects with teams for greater degree of collaborations.
                  </div>
                </div>
              </div>
              <Link
                to="/"
                className="bg-zinc-600 w-full md:w-48 h-10 mt-4 md:mt-0 md:ml-6 py-2 px-4 text-white font-semibold rounded-xl"
              >
                Explore Now
              </Link>
            </div>
            <div className="flex flex-col md:flex-row bg-zinc-800 w-full md:w-3/5 mx-auto rounded-3xl p-4 items-center">
              <div className="flex-shrink-0">
                <img
                  src=""
                  alt="img"
                  className="w-16 h-16 md:w-20 md:h-20 bg-zinc-700 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-white font-bold text-lg">Star Stork</div>
                <div className="text-white text-sm md:text-base mt-2">
                  Utilize drone imagery for comprehensive analytics to enhance
                  decision-making. Opt for either training custom models or
                  employing built-in detectors for precise image analysis.
                </div>
              </div>
            ))}
        </div> */}
          {/*<div
            className="flex   justify-center mt-5
            min-[1440px]:mt-10"
          >
            <div
              className="bg-neutral-900 px-3 py-2 w-7/12 flex justify-evenly rounded-2xl
            2xl:w-5/12"
            >
              <div className="w-24 h-24   mt-1 mx-3">
                {/* <div className=" w-full h-full aspect-square rounded-full bg-neutral-800"></div> 
                <img src={Starmarg} className="mt-4 "></img>
              </div>
              <div className=" w-full">
                <h1 className="font-bold my-1 text-neutral-500 text-xl">
                  Star Marg
                </h1>
                <p className="text-xs  text-neutral-600 font-semibold w-11/12 pb-1">
                  Plan missions,track flights, stream videos on cloud and get
                  detailed logs for useful insights. Sync your Software projects
                  with teams for greater degree of collaborations.
                </p>
              </div>
              <div className="w-72 mx-3  h-8 py-1.5  rounded-md bg-neutral-800 mt-9 transition  hover:bg-neutral-700 duration-200   cursor-pointer">
                <Link to="/sm/dashboard">
                  <h1 className="text-sm text-center font-semibold text-neutral-400">
                    Explore Now
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="flex  justify-center mt-5
        "
          >
            <div
              className="bg-neutral-900 px-3 py-2 w-7/12 flex justify-evenly rounded-2xl
            2xl:w-5/12"
            >
              <div className="w-24 h-24   mt-1 mx-3">
                {/* <div className=" w-full h-full aspect-square rounded-full bg-neutral-800"></div> 
                <img src={Starexplorer} className="mt-4"></img>
              </div>
              <div className=" w-full">
                <h1 className="font-bold my-1 text-neutral-500 text-xl">
                  Star eXplorer
                </h1>
                <p className="text-xs  text-neutral-600 font-semibold w-11/12 pb-1">
                  Plan missions,track flights, stream videos on cloud and get
                  detailed logs for useful insights. Sync your Software projects
                  with teams for greater degree of collaborations.
                </p>
              </div>
              <div className="w-72 mx-3  h-8 py-1.5  rounded-md bg-neutral-800 mt-9 transition  hover:bg-neutral-700 duration-200   cursor-pointer">
                <Link to="/dashboard">
                  <h1 className="text-sm text-center font-semibold text-neutral-400">
                    Explore Now
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center mt-5 mb-2
            min-[1440px]:mb-8"
          >
            <div
              className="bg-neutral-900 px-3 py-2 w-7/12 flex justify-evenly rounded-2xl
            2xl:w-5/12"
            >
              <div className="w-24 h-24 mt-1 mx-3">
                {/* <div className=" w-full h-full aspect-square rounded-full bg-neutral-800"></div> 
                <img src={StarStork} className="mt-4"></img>
              </div>
              <div className=" w-full">
                <h1 className="font-bold my-1 text-neutral-500 text-xl">
                  Star Stork
                </h1>
                <p className="text-xs  text-neutral-600 font-semibold w-11/12 pb-1">
                  Plan missions,track flights, stream videos on cloud and get
                  detailed logs for useful insights. Sync your Software projects
                  with teams for greater degree of collaborations.
                </p>
              </div>
              <div className="w-72 mx-3  h-8 py-1.5  rounded-md bg-neutral-800 mt-9 transition  hover:bg-neutral-700 duration-200   cursor-pointer">
                <Link to="/ss/dashboard">
                  <h1 className="text-sm text-center font-semibold text-neutral-400">
                    Explore Now
                  </h1>
                </Link>
              </div>
            </div>
          </div> */}

          <div className="flex justify-center mt-6 gap-20">
            <div className="lg:w-1/4 border border-neutral-400 h-96 rounded-3xl ">
              <div className="rounded-full border border-neutral-400 w-1/5 flex mx-auto w-32 h-32 mt-10">
                <img src={logoone} alt="star stork logo" className="p-3" />
              </div>
              <h1 className="text-center mt-8  font-bold text-neutral-300 text-3xl">
                STAR STORK
              </h1>
              <div className="mt-4 w-full bg-neutral-800 h-10">
                <p className="p-2 text-neutral-400 font-semibold text-center">
                  Your
                  <span className="text-neutral-800">
                    {" "}
                    Aerial Intelligence{" "}
                  </span>
                  Platform
                </p>
              </div>
              <div className="flex gap-2 p-4 w-full mx-auto my-4 justify-center gap-4">
                <button className="w-1/2 bg-neutral-400 text-neutral-900  rounded-md ">
                  Explore {">"}
                </button>
                <button className="w-1/2 border border-neutral-400 rounded-md py-1 ">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/4 border border-neutral-400 h-96 rounded-3xl ">
              <div className="rounded-full border border-neutral-400 w-1/5 flex mx-auto w-32 h-32 mt-10">
                <img src={logotwo} alt="star stork logo" className="p-3" />
              </div>
              <h1 className="text-center mt-8  font-bold text-neutral-300 text-3xl">
                STAR MARG
              </h1>
              <div className="mt-4 w-full bg-neutral-800 h-10">
                <p className="p-2 text-neutral-400 font-semibold text-center">
                  Your
                  <span className="text-neutral-800"> Path To Precision </span>
                  Insights
                </p>
              </div>
              <div className="flex gap-2 p-4 w-full mx-auto my-4 justify-center gap-4">
                <button className="w-1/2 bg-neutral-400 text-neutral-900  rounded-md ">
                  Explore {">"}
                </button>
                <button className="w-1/2 border border-neutral-400 rounded-md py-1 ">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/4 border border-neutral-400 h-96 rounded-3xl ">
              <div className="rounded-full border border-neutral-400 w-1/5 flex mx-auto w-32 h-32 mt-10">
                <img src={logothree} alt="star stork logo" className="" />
              </div>
              <h1 className="text-center mt-8  font-bold text-neutral-300 text-3xl">
                STAR EXPLORER
              </h1>
              <div className="mt-4 w-full bg-neutral-800 h-10">
                <p className="p-2 text-neutral-400 font-semibold text-center">
                  Your
                  <span className="text-neutral-800 "> Mission Control </span>
                  Hub
                </p>
              </div>
              <div className="flex gap-2 p-4 w-full mx-auto my-4 justify-center gap-4">
                <button className="w-1/2 bg-neutral-400 text-neutral-900  rounded-md ">
                  Explore {">"}
                </button>
                <button className="w-1/2 border border-neutral-400 rounded-md py-1 ">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
