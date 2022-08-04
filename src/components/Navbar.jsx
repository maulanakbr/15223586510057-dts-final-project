import React from "react";
import Typed from "react-typed";

const Navbar = () => {
  return (
    <div>
      <div className="flex py-6 mx-6 my-3 justify-center">
        <h1 className="text-xl text-black">
          <Typed
            strings={["GET SPOTIFY ALBUM"]}
            startDelay={100}
            typeSpeed={100}
            loop
          />
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
