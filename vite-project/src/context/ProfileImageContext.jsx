// ProfileContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const updateImage = (newImage) => {
    setImage(newImage);
    localStorage.setItem("profileImage", newImage);
  };

  return (
    <ProfileContext.Provider value={{ image, updateImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
