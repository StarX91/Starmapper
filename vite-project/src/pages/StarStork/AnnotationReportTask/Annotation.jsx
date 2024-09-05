import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronUp,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { PiCursorThin } from "react-icons/pi";
import { MdMyLocation } from "react-icons/md";
import { CiImport } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { LiaVectorSquareSolid } from "react-icons/lia";
import Navbar from "../../../components/Navbar";
import Image1 from "../../../assets/image1.jpg";
import Image2 from "../../../assets/image1.png";
import Image3 from "../../../assets/image2.png";
import Image4 from "../../../assets/image3.png";
import Image5 from "../../../assets/image5.jpg";

const Annotation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  // Sample array of images
  const images = [
    { name: "DJii0880.jpg", url: `${Image1}` },
    { name: "DJii0881.jpg", url: `${Image2}` },
    { name: "DJii0882.jpg", url: `${Image3}` },
    { name: "DJii0883.jpg", url: `${Image4}` },
    { name: "DJii0884.jpg", url: `${Image5}` },
    { name: "DJii0882.jpg", url: `${Image2}` },
    { name: "DJii0883.jpg", url: `${Image3}` },
    { name: "DJii0884.jpg", url: `${Image5}` },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const toggleCarousel = () => {
    setIsCarouselOpen(!isCarouselOpen);
  };

  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-c-gray h-4"></div>
      <h1 className="text-center h-auto text-zinc-200 bg-black text-2xl py-4 font-bold mb-4">
        Annotation Report Task
      </h1>
      <div className="flex justify-center py-2 flex-wrap">
        <button className="bg-zinc-800 text-zinc-300 px-5 py-2 m-2 font-semibold rounded-2xl">
          Create Task
        </button>
        <button className="bg-zinc-800 text-zinc-300 px-9 py-2 m-2 font-semibold rounded-2xl">
          Images
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-zinc-700 text-zinc-300 px-8 py-2 m-2 font-semibold rounded-2xl"
        >
          Setup
        </button>
        <button className="bg-zinc-800 text-zinc-300 px-8 py-2 m-2 font-semibold rounded-2xl">
          Report
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start mt-6 p-4">
        <div className="w-full bg-neutral-900 p-4 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-300 font-semibold px-2">
              {images[currentImageIndex].name}
            </span>
            <div>
              <span className="text-zinc-400 bg-zinc-800 px-4 py-1 rounded-sm">
                Annotated: 0
              </span>
              <span className="text-neutral-900 font-semibold bg-neutral-600 px-2 py-1 rounded-sm ml-2">
                Non-annotated: 0
              </span>
            </div>
            <div>
              <button className="bg-black font-semibold text-zinc-300 px-8 py-1 rounded-md border-2 border-zinc-400 mr-4">
                Clear
              </button>
              <button className="bg-zinc-200 text-neutral-900 font-semibold border-2 border-zinc- px-8 py-1 rounded-lg">
                Done
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-1">
            {/* Sidebar */}
            <div className="w-12 bg-zinc-900 flex flex-col items-center py-4">
              <PiCursorThin
                className="text-zinc-300 my-4 cursor-pointer"
                size={24}
              />
              <LiaVectorSquareSolid
                className="text-zinc-200 my-4 cursor-pointer"
                size={24}
              />
              <MdMyLocation
                className="text-zinc-100 my-4 cursor-pointer"
                size={24}
              />
              <CiImport
                className="text-zinc-300 my-4 cursor-pointer"
                size={24}
              />
              <GoUpload
                className="text-zinc-300 my-4 cursor-pointer"
                size={24}
              />
            </div>

            <div className="flex-1 flex flex-col md:flex-row">
              <div className="bg-neutral-800 h-64 md:h-96 rounded-lg mb-4 flex-1 relative">
                <img
                  src={images[currentImageIndex].url}
                  alt={images[currentImageIndex].name}
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  onClick={toggleCarousel}
                  className="absolute bottom-4 right-4 bg-zinc-700 text-zinc-300 px-4 py-2 rounded-md"
                >
                  {isCarouselOpen ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </button>
              </div>
              <div className="w-full md:w-1/4 lg:w-1/5 bg-zinc-900 p-4 rounded-lg shadow-lg mt-4 md:mt-0 md:ml-4">
                <button className="bg-neutral-700 text-zinc-400 w-full py-2 mb-4 rounded-lg font-semibold">
                  Add new class objects
                </button>
                <div className="flex justify-center">
                  <button className="bg-neutral-600 text-neutral-900 font-semibold w-1/3 py-2 mb-4 rounded-lg">
                    Add
                  </button>
                </div>
                <div className="text-zinc-300 text-[18px] mb-2">Classes</div>
                <div className="text-green-500">Trees - 0</div>
                <div className="text-blue-500">Rooftops - 0</div>
                <div className="text-red-500">Roads - 0</div>
              </div>
            </div>
          </div>

          {isCarouselOpen && (
            <div className="mt-4 bg-zinc-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevImage}
                  className="text-zinc-300 text-2xl p-2"
                >
                  <FaChevronLeft />
                </button>
                <div className="flex-1 overflow-x-auto">
                  <div className="flex justify-center space-x-2 py-2">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={img.name}
                        className={`object-cover rounded-md cursor-pointer transition-all duration-300 ${
                          index === currentImageIndex
                            ? "opacity-100 border-2 border-zinc-300"
                            : "opacity-70 hover:opacity-100"
                        } ${
                          images.length <= 5
                            ? "w-1/3 h-32"
                            : images.length <= 8
                            ? "w-1/5 h-28"
                            : "w-24 h-24"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={nextImage}
                  className="text-zinc-300 text-2xl p-2"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Annotation;
