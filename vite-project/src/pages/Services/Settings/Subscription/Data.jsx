import React from "react";
import Credit from "./Credits";
import Subs from "./Subs";

const Credits = () => {
  return (
    <>
      <div className="text-white w-full py-32 bg-neutral-950 p-8 shadow-lg">
        <Subs />
        <Credit />
      </div>
    </>
  );
};

export default Credits;
