import React from "react";
import NavigationPageForAdmin from "./NavigationPageForAdmin";
import { Link } from "react-router-dom";
export default function DashBoardForAdmin() {
  return (
    <div className="bg-black">
      <NavigationPageForAdmin />
      <div>
        <h1 className="text-center mt-5 font-bold text-[35px] text-orange-600">
          Welcome Admin
        </h1>
      </div>
      <div className="mt-[100px] flex  gap-[40px]  ">
        <div className="bg-white px-[30px] py-[10px] text-center ml-[30px] ">
          <h1 className="font-bold text-[20px]">
            View all the Registered Veneue Provider Users
          </h1>
          <Link to="/dres">
            <button className="bg-green-600 mt-4 px-2 py-1 rounded-md hover:bg-orange-600">
              View Details
            </button>
          </Link>
        </div>
        <div className="bg-white px-[30px] py-[10px] text-center">
          <h1 className="font-bold text-[20px] ">
            View all the Registered Musicians
          </h1>
          <Link to="/dmes">
            <button className="bg-green-600 mt-4 px-2 py-1 rounded-md hover:bg-orange-600 ">
              View Details
            </button>
          </Link>
        </div>
        <div className="bg-white px-[30px] py-[10px] text-center mr-[30px] ">
          <h1 className="font-bold text-[20px] ">
            View all the Registered Normal Viewer User
          </h1>
          <Link to="/dves">
            <button className="bg-green-600 mt-4 px-2 py-1 rounded-md hover:bg-orange-600">
              View Details
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-[205px]">sai</div>
    </div>
  );
}
