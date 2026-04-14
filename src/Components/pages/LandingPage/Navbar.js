import React from "react";
import { Link } from "react";
function Navbar() {
  return (
    <div>
      <div className="flex items-center gap-20">
        <Link to="/login">
          <p className="  hover:border-orange-600 hover:border-b-2  md:hidden cursor-pointer  font-bold text-[15px]  items-center text-center text-white ">
            Find Artists
          </p>
        </Link>
        <Link to="/login">
          <p className=" hover:border-orange-600 hover:border-b-2  md:hidden cursor-pointer font-bold text-[15px]   items-center text-center text-white ">
            Find Gigs
          </p>
        </Link>
        <Link to="/login">
          <p className="  hover:border-orange-600 hover:border-b-2  md:hidden cursor-pointer  font-bold text-[15px]  items-center text-center text-white  ">
            Find Shows
          </p>
        </Link>
      </div>
      <div className="flex  space-x-10 items-center ">
        <Link to="/login">
          <button
            className="border-white font-semibold hover:bg-orange-600 md:hidden px-2 hover:rounded-xl py-1 text-[15px] text-white"
            size="medium"
          >
            Log In
          </button>
        </Link>
        <Link to="/beforesign">
          <button className="border-white font-semibold text-[15px] hover:bg-orange-600 md:hidden px-2 py-1 hover:rounded-xl text-white ">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
