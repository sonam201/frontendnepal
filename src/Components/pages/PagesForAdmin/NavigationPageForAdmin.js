import React from "react";
import { Link } from "react-router-dom";
export default function NavigationPageForAdmin() {
  return (
    <>
      <div className="text-center bg-[#010101] sticky top-0">
        <div className=" flex justify-between bg-[#adadb167]   drop-shadow-xl">
          <div>
            <img
              className="h-[14vh] w-[14vh] relative left-6  pointer-cursor "
              alt="logo "
              src={require("../../../Images/gig.png")}
            />
          </div>
          <div>
            <Link to="/login">
              <button className="mt-4 mr-4 bg-orange-600 px-5 py-2 rounded-2xl text-white hover:bg-white hover:text-black font-bold">
                Log out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
