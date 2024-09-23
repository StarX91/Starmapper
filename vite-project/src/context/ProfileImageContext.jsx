// ProfileContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
      setImage(storedImage);
  }, []);

  return (
    <ProfileContext.Provider value={{ image, setImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
