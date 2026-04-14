import React from "react";
import { Link } from "react-router-dom";
function MobileNav() {
  return (
    <div className="md:text-gray-300   md:hover:text-white  md:rounded-md md:text-base md:font-medium md:flex md:flex-col md:max-w-fit md:m-auto    ">
      <Link to="/login">
        <p className="  text-white md:px-2 md:py-1 md:hover:bg-orange-600  ">
          Find Artists
        </p>
      </Link>
      <Link to="/login">
        <p className="  text-white md:px-2 md:py-1 md:hover:bg-orange-600 ">
          Find Gigs
        </p>
      </Link>
      <Link to="/login">
        <p className="  text-white md:px-2 md:py-1 md:hover:bg-orange-600  ">
          Find Shows
        </p>
      </Link>

      <Link to="/login">
        <button
          className=" text-white md:px-2 md:py-1 md:hover:bg-orange-600"
          size="medium"
        >
          Log In
        </button>
      </Link>
      <Link to="/beforesign">
        <button className=" text-white md:px-2 md:py-1 md:hover:bg-orange-600 ">
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default MobileNav;
